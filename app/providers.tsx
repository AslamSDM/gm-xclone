"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";


//rainbowkit
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {

  arbitrum,

} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
const { chains, publicClient } = configureChains(
	[ arbitrum],
	[
	  publicProvider()
	]
  );
  
  const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains
  });
  
  const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
  })
export function Providers({ children, themeProps }: {children:React.ReactNode,themeProps:any}) {
	return (
		<WagmiConfig config={wagmiConfig}>
		<RainbowKitProvider chains={chains}>
		<NextUIProvider>
			<NextThemesProvider {...themeProps}>
				{children}
				</NextThemesProvider>
		</NextUIProvider>
		</RainbowKitProvider>
		</WagmiConfig>
	);
}
