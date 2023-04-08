import { CardProvider } from "@/context/CardContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardProvider>
      <Component {...pageProps} />
    </CardProvider>
  );
}
