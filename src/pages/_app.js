import "@/styles/globals.css";
import GlobalState from "../../context/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <GlobalState>
      <SessionProvider>

    <ToastContainer />
    <Component {...pageProps} />
      </SessionProvider>
    </GlobalState>
  );
}
