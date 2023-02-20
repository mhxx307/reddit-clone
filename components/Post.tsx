import {
    ArrowDownIcon,
    ArrowUpIcon,
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    EllipsisHorizontalIcon,
    GifIcon,
    ShareIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";

interface PostProps {
    post: Post;
}

function Post({ post }: PostProps) {
    return (
        <div className="flex w-full cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
            {/* votes */}
            <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
                <ArrowUpIcon className="voteButton hover:text-red-400" />
                <p className="text-black font-bold text-xs">0</p>
                <ArrowDownIcon className="voteButton hover:text-blue-400" />
            </div>

            {/* section */}
            <div className="p-3 pb-1">
                {/* header */}
                <div className="flex items-center space-x-2">
                    <Avatar seed={post.username} />
                    <p className="text-xs text-gray-400">
                        <Link href={`/subreddit/${post.subreddit.topic}`}>
                            <span className="font-bold text-black hover:text-blue-400 hover:underline">
                                r/{post.subreddit.topic}
                            </span>
                        </Link>{" "}
                        . Posted by u/{post.username} <TimeAgo date={post.created_at} />
                    </p>
                </div>

                {/* body */}
                <div className="py-4">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2 text-sm font-light">{post.body}</p>
                </div>

                {/* image */}
                {post.image && <img className="w-full" src={post.image} alt="image" />}

                {/* footer */}
                <div className="flex space-x-4 text-gray-400">
                    <div className="postButton">
                        <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                        <p className="">{post.comments.length} Comments</p>
                    </div>
                    <div className="postButton">
                        <GifIcon className="w-6 h-6" />
                        <p className="hidden sm:inline">Award</p>
                    </div>
                    <div className="postButton">
                        <ShareIcon className="w-6 h-6" />
                        <p className="hidden sm:inline">Share</p>
                    </div>
                    <div className="postButton">
                        <BookmarkIcon className="w-6 h-6" />
                        <p className="hidden sm:inline">Save</p>
                    </div>
                    <div className="postButton">
                        <EllipsisHorizontalIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
