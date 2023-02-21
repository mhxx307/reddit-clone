import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "@/libs/apollo-client";
import { BaseLayout } from "@/components/layouts";
import { ReactElement } from "react";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
    Layout?: (page: any) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const apolloClient = useApollo(pageProps);
    const Layout = Component.Layout || ((page) => <BaseLayout>{page}</BaseLayout>);

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
                <SessionProvider session={session}>{Layout(<Component {...pageProps} />)}</SessionProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
