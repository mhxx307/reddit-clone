import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Header } from "components";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "libs/apollo-client";
// import client from "libs/apollo-client";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const apolloClient = useApollo(pageProps);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ApolloProvider client={apolloClient}>
                <SessionProvider session={session}>
                    <div className="h-screen overflow-y-scroll bg-slate-200">
                        <Header />
                        <Component {...pageProps} />
                    </div>
                </SessionProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
