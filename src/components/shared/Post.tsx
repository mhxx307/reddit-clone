import {
    ArrowDownIcon,
    ArrowUpIcon,
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    EllipsisHorizontalIcon,
    GifIcon,
    ShareIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Avatar from "./Avatar";
import { GET_VOTES_BY_POST_ID } from "@/graphql/queries";
import { ADD_VOTE } from "@/graphql/mutations";

interface PostProps {
    post: Post;
}

function Post({ post }: PostProps) {
    const [vote, setVote] = useState<boolean>();
    const { data: session } = useSession();

    const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
        variables: { post_id: post.id },
    });

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesByPostId"],
    });

    const upVote = async (isUpvote: boolean) => {
        if (!session) {
            toast.error("You must be logged in to vote!");
            return;
        }

        if (vote && isUpvote) return;

        if (vote === false && !isUpvote) return;

        await addVote({
            variables: {
                post_id: post.id,
                username: session.user?.name,
                vote: isUpvote,
            },
        });
    };

    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;

        // lates vote (as we sorted by newly created first in the SQL query)
        // we can improve this by sorting by moving it to the original query
        const vote = votes?.find((vote) => vote.username === session?.user?.name)?.vote;

        setVote(vote);
    }, [data]);

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVotesByPostId;
        const displayNumber = votes?.reduce((total, vote) => {
            return vote.vote ? (total += 1) : (total -= 1);
        }, 0);

        if (votes?.length === 0) return 0;

        if (displayNumber === 0) {
            return votes[0]?.vote ? 1 : -1;
        }

        return displayNumber;
    };

    const router = useRouter();

    return (
        <div
            className="flex w-full cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600"
            onClick={() => router.push(`https://reddit-clone-gamma-one.vercel.app/post/${post.id}`)}
        >
            {/* votes */}
            <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
                <ArrowUpIcon
                    onClick={() => upVote(true)}
                    className={`voteButton hover:text-red-400 ${vote && "text-red-400 "}`}
                />
                <p className="text-black font-bold text-xs">{displayVotes(data)}</p>
                <ArrowDownIcon
                    onClick={() => upVote(false)}
                    className={`voteButton hover:text-blue-400 ${vote === false && "text-blue-400"}`}
                />
            </div>

            {/* section */}
            <div className="p-3 pb-1">
                {/* header */}
                <div className="flex items-center space-x-2">
                    {post.user?.image ? <Avatar image={post.user.image} /> : <Avatar seed={post.user.name} />}
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
