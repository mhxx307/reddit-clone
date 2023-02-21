import { Avatar, Feed, PostBox } from "components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GET_POSTS_BY_TOPIC } from "graphql/queries";
// import client from "libs/apollo-client";
import { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "libs/apollo-client";
import { useQuery } from "@apollo/client";

function SubredditPage() {
    const {
        query: { topic },
    } = useRouter();

    const { data: session } = useSession();

    const { data: posts } = useQuery(GET_POSTS_BY_TOPIC, {
        variables: {
            topic: topic,
        },
        notifyOnNetworkStatusChange: true,
    });

    console.log(posts);

    return (
        <div className={`h-24 bg-red-400 p-8`}>
            <div className="-mx-8 mt-10 bg-white">
                <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                    <div className="-mt-5">
                        <Avatar seed={session?.user?.name as string} large />
                    </div>

                    <div className="py-2">
                        <h1 className="text-3xl font-semibold">Welcome to the r/{topic} topic</h1>
                        <p className="text-sm text-gray-400">r/{topic}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-5 max-w-5xl pb-10">
                <PostBox subreddit={topic as string} />
                <Feed postList={posts.postListByTopic} />
            </div>
        </div>
    );
}

export default SubredditPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
    let topic = params?.topic;
    const client = initializeApollo();

    // Code will go here
    await client.query({
        query: GET_POSTS_BY_TOPIC,
        variables: {
            topic: topic,
        },
    });

    return addApolloState(client, {
        props: {},
    });
};
