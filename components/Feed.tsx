import Post from "./Post";
import { PostSkeleton } from "./skeletons";

interface FeedProps {
    postList?: Post[];
}

function Feed({ postList }: FeedProps) {
    const postSkeleton = [1, 2, 3, 4];

    if (!postList) {
        return (
            <div className="mt-5 space-y-4 w-full">
                {postSkeleton.map((skeleton) => (
                    <PostSkeleton key={skeleton} />
                ))}
            </div>
        );
    }

    console.log(postList);

    return (
        <div className="mt-5 space-y-4 w-full">
            {postList?.map((post) => (
                <div className="block" key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
}

export default Feed;
