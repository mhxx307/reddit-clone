import { GET_POSTS, GET_POSTS_BY_TOPIC } from "graphql/queries";
import { useQuery } from "@apollo/client";
import Post from "./Post";
import { PostSkeleton } from "./skeletons";
import Link from "next/link";
import { useRouter } from "next/router";

interface FeedProps {
    topic?: string;
}

function Feed({ topic }: FeedProps) {
    const router = useRouter();
    const { data, error, loading } = !topic
        ? useQuery(GET_POSTS)
        : useQuery(GET_POSTS_BY_TOPIC, {
              variables: { topic },
          });

    const posts: Post[] = !topic ? data?.postList : data?.postListByTopic;

    if (error) {
        console.log("error", error);
    }

    const postSkeleton = [1, 2, 3, 4];

    if (loading) {
        return (
            <div className="mt-5 space-y-4 w-full">
                {postSkeleton.map((skeleton) => (
                    <PostSkeleton key={skeleton} />
                ))}
            </div>
        );
    }

    return (
        <div className="mt-5 space-y-4 w-full">
            {posts?.map((post) => (
                <div className="block" key={post.id} onClick={() => router.push(`post/${post.id}`)}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
}

export default Feed;
