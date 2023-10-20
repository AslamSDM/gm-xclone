import {
  Tab,
  Tabs,
  Card,
  CardBody,
  Switch,
  Divider,
  Button,
  Image,
} from "@nextui-org/react";
import React from "react";
import Long from "./Long";
import Swap from "./Swap";

const BuySell = () => {
  // const [isLong,setLong]= useState(true)
  return (
    <div className="flex flex-grow-1 flex-col items-center w-1/3 mr-4 ">
      <Card className="w-full justify-center items-center pt-4">
        <Tabs color="success" aria-label="Options">
          <Tab
            className="pl-4 pr-4 flex items-left w-100 bg-green w-full"
            key="long"
            title={
              <div className="flex items-center space-x-2">
                <Image
                  width="20px"
                  style={{ filter: "invert(0)" }}
                  src="/increase.png"
                ></Image>
                <span>Long</span>
              </div>
            }
          >
            <Long isLong={true} />
          </Tab>
          <Tab
            className="pl-4 pr-4 flex items-left w-100 bg-green w-full"
            key="short"
            title={
              <div className="flex items-center space-x-2">
                <Image
                  width="20px"
                  style={{ filter: "invert(0)" }}
                  src="/decrease.png"
                ></Image>
                <span>Short</span>
              </div>
            }
          >
            <Long isLong={false} />
            {/* <Short /> */}
          </Tab>
          <Tab
            className="pl-4 pr-4 flex flex-col items-left w-100 w-full bg-dark"
            key="swap"
            title={
              <div className="flex items-center space-x-2">
                <Image
                  width="20px"
                  style={{ filter: "invert(0)" }}
                  src="/switch.png"
                ></Image>
                <span>Swap</span>
              </div>
            }
          >
            <Swap />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default BuySell;
