import React, { useEffect, useRef } from "react";
import {
  Card,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  Input,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

let tvScriptLoadingPromise: any;

export default function TradingViewChart(): JSX.Element {
  const onLoadScriptRef = useRef<any>();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve: any) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {};

    function createWidget() {
      if (
        document.getElementById("tradingview_ac53f") &&
        "TradingView" in window
      ) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: "CRYPTO:ETHUSD",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "in",
          enable_publishing: false,
          gridColor: "rgba(0, 0, 0, 1)",
          withdateranges: true,
          hide_top_toolbar: true,
          hide_legend: true,
          hide_side_toolbar: false,
          container_id: "tradingview_ac53f",
        });
      }
    }
  }, []);

  return (
    <>
      <Card className="flex flex-row justify-start gap-20 p-3 mb-2">
        <div>
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <div className="text-2xl ml-2 font-bold cursor-pointer flex flex-row">
                <span className="mr-2">SOL/USD</span>
                <Image
                  style={{ filter: "invert(1)" }}
                  height="35px"
                  width="35px"
                  src="/down-arrow.png"
                ></Image>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-full">

              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <p className="text-default-500 text-[12px] text-center">$1,560.36</p>
          <p className="text-center">$1,560.24</p>
        </div>

        <div>
          <p className="text-default-500 text-[12px] text-center">24h Change</p>
          <p className="text-center text-danger">-0.38%</p>
        </div>

        <div>
          <p className="text-default-500 text-[12px] text-center">24h High</p>
          <p className="text-center">$1,789.24</p>
        </div>

        <div>
          <p className="text-default-500 text-[12px] text-center">24h Low</p>
          <p className="text-center">$1,250.24</p>
        </div>
      </Card>
      <div
        className="tradingview-widget-container"
        style={{ height: "550px", width: "100%" }}
      >
        <div
          id="tradingview_ac53f"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        />
      </div>
    </>
  );
}
