import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { arbitrumGoerli } from "wagmi/chains";
const alchemyId = process.env.ALCHEMY_ID;
const chains = [arbitrumGoerli];
const client = createClient(
  getDefaultClient({
    appName: "NitroFinance",
    alchemyId,
    chains,
  })
);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="nouns">
        <Component {...pageProps} />{" "}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
