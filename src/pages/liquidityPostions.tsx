import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { TvlChart, VolumeChart } from "@/components/charts";
import { Pool } from "@/components/pools";
import { MobileMenu, Navbar } from "@/components/Navbar";
import { LiquidityBase } from "@/components/liquidity";
import { useMobileNavState } from "@/hooks/stores/mobileMenuStore";
import MobileLiquidtyPosition from "@/components/liquidity/MobileLiquidtyPosition";
const inter = Inter({ subsets: ["latin"] });

export default function LiquidityPostions() {
  const { isMobileMenuOpen }: any = useMobileNavState();
  return (
    <>
      <Head>
        <title>Nitro finance || Pools </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between  bg-background`}
      >
        {" "}
        {isMobileMenuOpen ? (
          <MobileMenu />
        ) : (
          <>
            <Navbar />
            <MobileLiquidtyPosition />

            <div className="mb-20"></div>
          </>
        )}
      </main>
    </>
  );
}
