import type { NextPage } from "next";
import Head from "next/head";
import { PostBox } from "components";

const Home: NextPage = () => {
    return (
        <div className="max-w-5xl my-7 mx-auto">
            <Head>
                <title>Credit clone</title>
                <link rel="stylesheet" href="/favicon.ico" />
            </Head>

            <PostBox />
        </div>
    );
};

export default Home;
