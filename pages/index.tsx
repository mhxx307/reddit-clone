import type { NextPage } from "next";
import Head from "next/head";
import { PostBox } from "components";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Credit clone</title>
                <link rel="stylesheet" href="/reddit.ico" />
            </Head>

            <PostBox />
        </div>
    );
};

export default Home;
