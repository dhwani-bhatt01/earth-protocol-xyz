"use client";

import EarthProtocolLogo from "@/assets/images/logo.png";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Image from "next/image";
import Link from "next/link";
import { WagmiConfig } from "wagmi";

import { Menubar } from "primereact/menubar";

import { chains, wagmiConfig } from "@/config/wagmi";
import "./globals.css";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <div className="bg_gray">
              <Menubar
                start={
                  <Link href="/">
                    <Image
                      alt="earth-protocol-logo"
                      src={EarthProtocolLogo.src}
                      width={EarthProtocolLogo.width}
                      height={EarthProtocolLogo.height}
                    />
                  </Link>
                }
                end={<ConnectButton />}
                className="custom-container"
              />
            </div>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
