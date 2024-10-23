import "@/styles/globals.css";
import GlobalState from "../../context/index";
export default function App({ Component, pageProps }) {
  return (
    <GlobalState>
    <Component {...pageProps} />
    </GlobalState>
  );
}
