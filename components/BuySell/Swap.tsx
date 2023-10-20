import { Token_ins, Token_outs, getPrice, reader_addr, router_addr, vault_addr } from "@/config/tokens";
import {
  Tab,
  Tabs,
  Card,
  CardBody,
  Switch,
  Divider,
  Button,
  Chip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { erc20ABI, useAccount, useBalance, useContractRead,useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { Select, SelectItem } from "@nextui-org/react";
import { reader_abi, router_abi } from "@/config/abi";

const Swap = () => {
  const { address, isConnected } = useAccount();

  const [status, setstatus] = React.useState("Connect Wallet");
  //inputs
  const [indexCoin, setindexCoin] = React.useState("BTC");
  const [payCoin, setPayCoin] = React.useState("WETH");
  const [amountin, setAmountin] = useState(0);
  const [amountout, setAmountout] = useState(0);
  const [payCoinprice, setpayCoinprice] = useState<any>(0);
  const [indexCoinprice, setindexCoinPrice] = useState(0);
  const [price_ether, setPrice_ether] = useState(0);
  const [fee, setFee] = useState(0);
  function swapCoin() {
    setindexCoin(payCoin);
    setPayCoin(indexCoin);
  }
  const[selectedIndexCoin,setSelectedIndexCoin]=useState<any>({
    name:"WBTC",
    address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    decimal:8
})
  const [selectedPayCoin,setselectedPayCoin]=  useState<any>({
    name:"USDC",
    address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    //icon -yuvraj
    decimal:6
})
const { data: paybalance } = useBalance({
  address: address,
  token:selectedPayCoin.address,
  watch: true,
  });
  const {data:amount_out }:{data:any}=useContractRead({
    abi:reader_abi,
    address:reader_addr,
    functionName:"getAmountOut",
    args:[vault_addr,selectedPayCoin?.address,selectedIndexCoin.address,
      amountin?ethers.parseUnits(String(amountin),selectedPayCoin.decimal):""]
  })
  const {data:approvePaydata,write:approvePay}=useContractWrite({
    abi:erc20ABI,
    address:selectedPayCoin.address,
    functionName:"approve",
    args:[router_addr,ethers.parseUnits(amountin.toString(),
      selectedPayCoin.decimal)]
  })
  const {data:swapdata,write:swap}=useContractWrite({
    abi:router_abi,
    address:router_addr,
    functionName:"swap",
    args:[[selectedPayCoin.address,selectedIndexCoin.address],
    ethers.parseUnits(String(amountin),selectedPayCoin.decimal).toString(),
    amount_out?amount_out[0]:"",address]
  })

const getprice = async () => {
  if(selectedIndexCoin){
    const f = await getPrice(selectedIndexCoin.address);
    setindexCoinPrice(Number(ethers.formatUnits(f?String(f):"0",selectedIndexCoin.decimal)));
    const g = await getPrice(selectedPayCoin.address)
    const h= Number(ethers.formatUnits(g?String(g):"0",selectedPayCoin.decimal))
    setpayCoinprice(h)
  }
};
function executeswap(){
  approvePay()
  swap()
}
useEffect(()=>{
  setSelectedIndexCoin(Token_outs.find((a: any) => a.name === indexCoin))
  setselectedPayCoin(Token_ins.find((a: any) =>a.name === payCoin ));
  getprice()
  if(amount_out){
      if(amount_out?.length>0){
        setAmountout((Number(ethers.formatUnits(amount_out[0],selectedIndexCoin.decimal))))
        setFee(Number(ethers.formatUnits(amount_out[1],selectedIndexCoin.decimal)))
    }
  }
  
},[amountin,payCoin,indexCoin])

useEffect(() => {
  let b= false
  if(payCoin=="WETH"){
    if(Number(paybalance?.formatted)<amountin){

      setstatus("Insufficient Balance");
      b= true
    }
  }
  if(paybalance){
    if(Number(paybalance.valueOf)<amountin){
      setstatus("Insufficient Balance");
      b=true
    }
  }
  if (!isConnected) {
    setstatus("Connect Wallet");
    b= true
  }
  if(!b){
    setstatus("200")
  }

}, [address, payCoin, indexCoin]);
console.log(selectedPayCoin)
console.log(selectedIndexCoin)
function SetMaxAmntin(){
  console.log(paybalance?.value)
  setAmountin(Number(paybalance?.value))
}
  return (
    <>
      <div className="w-full w-100">
        <Card className="w-full flex-row  justify-between bg-emerald-950 p-4">
          <div>
            <p className="text-default-500">Pay</p>
            <input className="input" placeholder="0.0" onChange={(e)=>setAmountin(Number(e.target.value))} type="number" />

          </div>
          <div className="flex flex-col items-end">
            <p className="text-default-500 text-right flex flex-end">
              {" "}
              <Chip
                className="p-0 pr-1 pl-1 mr-2 text-[12px] cursor-pointer"
                color="success"
                onClick={()=>SetMaxAmntin()}
              >
                Max
              </Chip>{" "}
              Balance
            </p>
            <div className="w-20">
              <Select
                labelPlacement="outside"
                style={{ background: "#022c22", color: "#ffffff" }}
                className="w-[90px] px-0 text-right"
              >
                {Token_ins.map((a: any, i: number) => {
                  return (
                    <SelectItem onClick={(e)=>{
                      e.preventDefault()
                      setPayCoin(a.name)
                    }} className="" key={i}>
                      {a.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </Card>
        <div>
          <img
            // onClick={() => swapCoin()}
            className="h-[30px] w-[30px] relative bottom-4 m-auto z-10"
            src="/arrow.png"
          ></img>
        </div>
        <Card className="w-full flex-row  justify-between relative bottom-6 bg-emerald-950 p-4">
          <div>
            <p className="text-default-500">Long</p>
            <input className="input" placeholder="0.0" type="number" value={amountout}
            onChange={(e)=>setAmountout(Number(e.target.value))}/>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-default-500 text-right flex flex-end">
              {" "}

            </p>
            <div className="w-20">
              <Select
                labelPlacement="outside"
                style={{ background: "#022c22", color: "#ffffff" }}
                className="w-[90px] px-0 text-right"
              >
                {Token_outs.map((a: any, i: number) => {
                  return (
                    <SelectItem onClick={(e)=>{
                      e.preventDefault()
                      setindexCoin(a.name)
                    }} className="" key={i}>
                      {a.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </Card>

        <Button onClick={()=>executeswap()} className="w-full mt-0 mb-4" color="success">
          Swap
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between ">
          <p className="text-green-500 text-sm">SWAP</p>
        </div>
        <Divider className="mt-4 mb-4" />

        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">{indexCoin} Price</p> {/*NEED TO CHANGE ARB WITH STATE VARIBLE OF COIN - ASLAM FYI*/}
          <p className="text-success text-sm">${indexCoinprice}</p>
        </div>

        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">{payCoin} Price</p>  {/*NEED TO CHANGE SOL WITH STATE VARIBLE OF COIN - ASLAM FYI*/}
          <p className="text-success text-sm">${payCoinprice}</p>
        </div>

        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">Fee</p>
          <p className="text-success text-sm">${fee}</p>
        </div>

        {/* <div className="flex justify-between ">
          <p className="text-default-500 text-sm">Price </p>
          <p className="text-success text-sm">{amount_out?(Number(ethers.formatUnits(amount_out,selectedIndexCoin.decimal))/amountin):""} {payCoin} / {indexCoin}</p>
        </div> */}
      </div>
    </>
  );
};

export default Swap;
