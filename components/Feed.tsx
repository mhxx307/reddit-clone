import { GET_POSTS } from "graphql/queries";
import { useQuery } from "@apollo/client";
import Post from "./Post";
import { PostSkeleton } from "./skeletons";

function Feed() {
    const { data, error, loading } = useQuery(GET_POSTS);

    const posts: Post[] = data?.postList;

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
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Feed;
