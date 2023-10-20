import { Token_ins, Token_outs, getPrice, posnrouter_addr, reader_addr, router_addr, vault_addr } from "@/config/tokens";
import {
  Tab,
  Tabs,
  Card,
  CardBody,
  Switch,
  Divider,
  Button,
  Chip
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { erc20ABI, useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";
import { Select, SelectItem } from "@nextui-org/react";
import { posnrouter_abi, reader_abi, router_abi } from "@/config/abi";
interface LongPRops {
  isLong: boolean;
}

const Long:React.FC<LongPRops> = ({isLong}) => {
  const [toggleLevrage, setToggleLevrage] = React.useState(true);
  const { address, isConnected } = useAccount();
  const [status, setstatus] = React.useState("Connect Wallet");
  //inputs
  const [indexCoin, setindexCoin] = React.useState("BTC");
  const [payCoin, setPayCoin] = React.useState("WETH");
  const [levrage, setLevrage] = React.useState(25);
  //Long true Short false -yuvraj
  // const [isLong, setLong] = useState(true);
  const [sizeDelta, setSizeDelta] = useState(0);
  const [acceptablePrice, setAcceptablePrice] = useState(0);
  const [amountin, setAmountin] = useState(0);
  const [amountout, setAmountout] = useState(0);
  const [price, setPrice] = useState(0);
  const [price_ether, setPrice_ether] = useState(0);
  const [fee, setFee] = useState(0);
  // let price:any = 0
  // let selectedIndexCoin :any 
  // let selectedPayCoin:any
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

const getprice = async () => {
  if(selectedIndexCoin){
    const f = await getPrice(selectedIndexCoin.address);
    setPrice(f);
    const g = await getPrice("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1")
    setPrice_ether(g)

  }
};
  //token balance

  // const { data: paybalance } = useContractRead({
  //   abi: erc20ABI,
  //   address: selectedPayCoin?selectedPayCoin.address:"",
  //   functionName: "balanceOf",
  //   args: [address],
  // });
const { data: paybalance } = useBalance({
address: address,
token:selectedPayCoin.address,
watch: true,
});
const {data:executionFee}:{data:any}=useContractRead({
  abi:posnrouter_abi,
  address:posnrouter_addr,
  functionName:"minExecutionFee",
})
const {data:usdc_amountin }:{data:any}=useContractRead({
  abi:reader_abi,
  address:reader_addr,
  functionName:"getAmountOut",
  args:[vault_addr,selectedPayCoin?.address,"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",amountin?ethers.parseUnits(String(amountin),selectedPayCoin.decimal):""]
})
const {data:approvePlugindata,write:approvePlugin} =useContractWrite({
  abi:router_abi,
  address:router_addr,
  functionName:"approvePlugin",
  args:[posnrouter_addr]
})
const {data:approvePaydata,write:approvePay}=useContractWrite({
  abi:erc20ABI,
  address:selectedPayCoin.address,
  functionName:"approve",
  args:[router_addr,ethers.parseUnits(amountin.toString(),selectedPayCoin.decimal)]
})
// console.log(price)
const {config:openconfig}=usePrepareContractWrite(
  {
    abi:posnrouter_abi,
    address:posnrouter_addr,
    functionName:"createIncreasePosition",
    args:[
      selectedPayCoin.address,
      selectedIndexCoin.address,
      amountin?ethers.parseUnits(amountin.toString(),selectedPayCoin.decimal):"",
      usdc_amountin?usdc_amountin[0]:"0",
      sizeDelta?ethers.parseUnits(String(Number(sizeDelta).toFixed(30)),30).toString():"",
      isLong,
      price?ethers.parseUnits(price.toString(),30).toString():"",
      executionFee,
      ethers.encodeBytes32String("abstra"),
      router_addr
    ],
    value:executionFee
  }
)
const {data:openPositiondata,write:openPosition}:{data:any,write:any} =useContractWrite(openconfig)
useEffect(()=>{
  setSelectedIndexCoin(Token_outs.find((a: any) => a.name === indexCoin))
  setselectedPayCoin(Token_ins.find((a: any) =>a.name === payCoin ));
  getprice()
  if(usdc_amountin){
    if(toggleLevrage){
      if(usdc_amountin?.length>0){
        setSizeDelta(Number(ethers.formatUnits(usdc_amountin[0],6))*levrage)
        setAmountout((Number(ethers.formatUnits(usdc_amountin[0],6))*levrage)/Number(ethers.formatUnits(price,30)))
        setFee((Number(ethers.formatUnits(usdc_amountin[1],6))*0.05)+Number(ethers.formatUnits(usdc_amountin[1],6)))
      }
    }
  }
  
},[amountin,levrage,payCoin,indexCoin])
function open(){
  approvePlugin()
  approvePay()
  openPosition?.()
}
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
      b= true
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
function SetMaxAmntin(){
  console.log(paybalance?.value)
  setAmountin(Number(paybalance?.value))
}
  function swapCoin() {
    setindexCoin(payCoin);
    setPayCoin(indexCoin);
  }
  function LevrageChange(value: any) {
    setLevrage(value as number);
  }
  return (
    <div className="w-full w-100">
      <Card className="w-full flex-row  justify-between bg-emerald-950 p-4">
        <div>
          <p className="text-default-500">Pay</p>
          <input className="input" placeholder="0.0" onChange={(e)=>setAmountin(Number(e.target.value))} type="number" />
        </div>
        <div className="flex flex-col items-end">
          <p className="text-default-500 text-right flex flex-end"> <Chip  onClick={()=>SetMaxAmntin()} className="p-0 pr-1 pl-1 mr-2 text-[12px] cursor-pointer" color="success">Max</Chip> Balance</p>
          <div className="w-20">
            <Select  labelPlacement="outside" defaultValue={"WETH"}  style={{ background: "#022c22", color: "#ffffff" }} className="w-[90px] px-0 text-right">
              {Token_ins.map((a: any, i: number) => {
                return <SelectItem onClick={(e)=>{
                  e.preventDefault()
                  setPayCoin(a.name)
                }} className="" key={i}>{a.name}</SelectItem>;
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
          <input className="input" placeholder="0.0" onChange={(e)=>setAmountout(Number(e.target.value))} value={amountout} type="number" />
        </div>
        <div>
          <p className="text-default-500"></p>
          <Select  labelPlacement="outside"  defaultValue={"WBTC"} style={{ background: "#022c22", color: "#ffffff" }} className="w-[90px] px-0 text-right">
              {Token_outs.map((a: any, i: number) => {
                return <SelectItem onClick={(e)=>{
                  e.preventDefault()
                  setindexCoin(a.name)
                }} className="" key={i}>{a.name}</SelectItem>;
              })}
            </Select>
        </div>
      </Card>

      <div className="flex justify-between relative bottom-2">
        <p className="text-success text-sm">Leverage : {levrage}x</p>
        <Switch
          className="p-0"
          defaultSelected
          color="success"
          size="sm"
          onChange={() => setToggleLevrage(!toggleLevrage)}
        />
      </div>

      <div>
        <input
          onChange={(e) => LevrageChange(e.target.value)}
          style={
            toggleLevrage
              ? {
                  backgroundColor: "green",
                  borderRadius: "10px",
                  height: "5px",
                }
              : {
                  backgroundColor: "grey",
                  borderRadius: "10px",
                  height: "5px",
                }
          }
          className="w-full"
          type="range"
          id="vol"
          name="vol"
          min="0.00"
          step="0.01"
          max="50.00"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">Pool</p>
          <p className="text-success text-sm">{payCoin!="USDC"?payCoin:""}-USDC</p>
        </div>

        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">Leverage</p>
          <p className="text-success text-sm">{levrage}x</p>
        </div>

        <div className="flex justify-between mb-1">
          <p className="text-default-500 text-sm">Entry Price</p>
          <p className="text-success text-sm">{Number(ethers.formatUnits(price,30))}</p>
        </div>

        <div className="flex justify-between ">
          <p className="text-default-500 text-sm">Price Impact</p>
          <p className="text-success text-sm">0.00%</p>
        </div>
        <Divider className="mt-4 mb-4" />
        <div className="flex justify-between ">
          <p className="text-default-500 text-sm">Fee and Price Impact</p>
          <p className=" text-sm">${fee}</p>
        </div>
      </div>
      <Button className="w-full mt-10 mb-4" color="success" onClick={()=>open()}>
        {isLong?"Long":"Short"}
      </Button>
    </div>
  );
};

export default Long;
