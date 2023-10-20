"use client";
import React from "react";
import { Card, Chip} from "@nextui-org/react";
import TradingViewChart from "@/components/TradingViewChart";
import BuySell from "@/components/BuySell/buySell";
import OrderBook from "@/components/OrderBook/OrderBook";

export default function Home() {
  const [tab, setTab] = React.useState('orders');
  return (
    <>
      <div className="flex">
       
         <BuySell />
          
        <Card className="w-full bg-dark">
          <TradingViewChart />
        </Card>
      </div>
      <div className="mb-4 mt-6">
      <Chip className="mr-2" color="success" variant={tab==="Positions"?"bordered":"flat"}>Positions</Chip>
      <Chip className="mr-2" color="success"variant={tab==="Orders"?"bordered":"flat"}>Orders</Chip>
      <Chip color="success" variant={tab==="Trades"?"bordered":"flat"}>Trades</Chip>
      
        </div>
      <OrderBook />
    </>
  );
}
