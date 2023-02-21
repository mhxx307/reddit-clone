import type { GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";

import { GET_POSTS, SUBREDDIT_PAGINATED_LIST } from "@/graphql/queries";
import { addApolloState, initializeApollo } from "@/libs/apollo-client";
import { Feed, Head, PostBox, SubredditRow } from "@/components/shared";

const Home = () => {
    const { data } = useQuery(SUBREDDIT_PAGINATED_LIST, {
        variables: {
            limit: 10,
        },
        notifyOnNetworkStatusChange: true,
    });
    const { data: posts } = useQuery(GET_POSTS);

    const subredditList: Subreddit[] = data?.subredditPaginatedList;

    return (
        <div className="max-w-5xl my-7 mx-auto">
            <Head />

            <PostBox />

            <div className="flex">
                <Feed postList={posts?.postList} />

                <div className="sticky top-36 mx-5 hidden mt-5 h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
                    <p className="text-md mb-1 p-4 pb-3 font-bold">Top communities</p>

                    <div className="">
                        {subredditList?.map((subreddit, index) => (
                            <SubredditRow key={subreddit.id} topic={subreddit.topic} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//     const client = initializeApollo();
//     // Code will go here
//     await client.query({
//         query: GET_POSTS,
//     });

//     await client.query({
//         query: SUBREDDIT_PAGINATED_LIST,
//         variables: {
//             limit: 10,
//         },
//     });

//     return addApolloState(client, {
//         props: {},
//     });
// };
