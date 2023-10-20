import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
export const vault_addr ="0x489ee077994B6658eAfA855C308275EAd8097C4A"
export const router_addr ="0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064"
export const posnrouter_addr ="0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868"
export const orderbook_addr ="0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB"
export const reader_addr = "0x22199a49A999c351eF7927602CFB187ec3cae489"

export async function getPrice(address?:string){
  const res = await axios.get("https://api.gmx.io/prices").then((res:any)=>{
  console.log(res.data)
  return res.data
  })
  const price = res[String(address)]
  if(price){
    return price
  }else{
    return "Price not found"
  }
}
// export async function getToken(address?:string){

//   const res = await axios.get("https://api.gmx.io/tokens").then((res:any)=>{
//   console.log(res.data)
//   return res.data
//   })
//   const token = res[String(address)]
//   if(token){
//     console.log(token)
//     return token

//   }else{
//     return "Token not found"
//   }
// }
// export async function getActions(address?:string){

//     let longs:any =[]
//     let shorts:any =[]
//   const res = await axios.get(`https://api.gmx.io/actions?account=${address}`,).then((res:any)=>{
// //   console.log(res.data)
//   for (let a in res.data){
//       const action = JSON.parse(res.data[a].data.params)

//       if((res.data[a].data.action=="IncreasePosition-Long") || (res.data[a].data.action=="DecreasePosition-Long")){
//         const present =(longs.some((obj:any)=> obj.indexToken == action.indexToken))
//         if (!present){
//             longs.push({key: action.key,indexToken:action.indexToken,
//                 sizeDelta:action.sizeDelta,isLong:action.isLong,
//                 collateralToken:action.collateralToken,
//                 collateralDelta:action.collateralDelta,
//                 id:a,
//             price:action.price})
//         }
//         if((res.data[a].data.action=="IncreasePosition-Long")){
//             const find = longs.map((a:any,index:number)=>{
//                 if (a.indexToken == action.indexToken){
//                     a.sizeDelta =  Number(a.sizeDelta)+Number(action.sizeDelta)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
//                 }
//             } )
//         }
//         if((res.data[a].data.action=="DecreasePosition-Long")){
//             const find = longs.map((a:any,index:number)=>{
//                 if (a.indexToken == action.indexToken){
//                     a.sizeDelta =  Number(a.sizeDelta)-Number(action.sizeDelta) 
//         }} )
//         }
//     }
//     if((res.data[a].data.action=="IncreasePosition-Short") || (res.data[a].data.action=="DecreasePosition-Short")){
//         const present =(shorts.some((obj:any)=> obj.indexToken == action.indexToken))
//         if (!present){
//             shorts.push({key: action.key,indexToken:action.indexToken,
//                 collateralToken:action.collateralToken,
//                 sizeDelta:action.sizeDelta,isLong:action.isLong,
//                 collateralDelta:action.collateralDelta,
//                 id:a,
//             price:action.price})
//         }
//         if((res.data[a].data.action=="IncreasePosition-Short")){
//             const find = shorts.map((a:any,index:number)=>{
//                 if (a.indexToken == action.indexToken){
//                     a.sizeDelta =  Number(a.sizeDelta)+Number(action.sizeDelta)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
//                 }
//             } )
//         }
//         if((res.data[a].data.action=="DecreasePosition-Short")){
//             const find = shorts.map((a:any,index:number)=>{
//                 if (a.indexToken == action.indexToken){
//                     a.sizeDelta =  Number(a.sizeDelta)-Number(action.sizeDelta) 
//         }} )
//         }
//     }
//   }
//   return res.data})

//   return {longs:longs,shorts:shorts}
// }
// getActions("0x4Bf2120F90Feff1E1f443Ad07E542CA6b2F30105")

export const Token_outs =[
    {
        name:"ETH",
        address:"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        decimal:18
    },
    // {
    //     name:"ARB",
    //     address:"0x912CE59144191C1204E64559FE8253a0e49E6548",
    //     decimal:18
    // },
    {
        name:"LINK",
        address:"0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
        decimal:18
    },
    // {
    //     name:"SOL",
    //     address:"0xb74Da9FE2F96B9E0a5f4A3cf0b92dd2bEC617124",
    //     decimal:9
    // },
    {
        name:"UNI",
        address:"0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
        decimal:18
    },
    {
        name:"BTC",
        address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        decimal:8
    }
]

export const Token_ins = [
    {
        name:"WETH",
        address:"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        decimal:18
    },
    {
        name:"ARB",
        address:"0x912CE59144191C1204E64559FE8253a0e49E6548",
        decimal:18
    },
    {
        name:"LINK",
        address:"0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
        decimal:18
    },
    {
        name:"SOL",
        address:"0xb74Da9FE2F96B9E0a5f4A3cf0b92dd2bEC617124",
        decimal:9
    },
    {
        name:"UNI",
        address:"0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
        decimal:18
    },
    {
        name:"WBTC",
        address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        decimal:8
    },
    {
        name:"USDC",
        address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimal:6
    },
    {
        name:"USDC.e",
        address:"0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        decimal:6
    },
    {
        name:"DAI",
        address:"0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        decimal:18
    },
    {
        name:"USDT",
        address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimal:6
    },
]
