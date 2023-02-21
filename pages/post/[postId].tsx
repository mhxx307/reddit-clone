import { GET_POST_BY_ID } from "graphql/queries";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Post } from "components";
import { useSession } from "next-auth/react";
import { Jelly } from "@uiball/loaders";
import { useForm, SubmitHandler } from "react-hook-form";
import { ADD_COMMENT } from "graphql/mutations";
import { toast } from "react-toastify";
import TimeAgo from "react-timeago";
import { useEffect } from "react";
import { supabaseClient } from "libs/supabase";

interface CommentData {
    comment: string;
}

function PostDetailPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const {
        data,
        loading: getPostLoading,
        error,
        refetch: refetchPost,
    } = useQuery(GET_POST_BY_ID, {
        variables: {
            id: router.query.postId,
        },
    });

    useEffect(() => {
        const subscription = supabaseClient
            .channel("comment")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "comment",
                },
                (payload) => {
                    console.log("payload", payload);
                    refetchPost();
                }
            )
            .subscribe();

        return () => {
            supabaseClient.removeChannel(subscription);
        };
    }, []);

    const [addComment, { loading: addCommentLoading }] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_ID, "post"],
    });
    const { register, setValue, handleSubmit } = useForm<CommentData>({});

    const handleComment: SubmitHandler<CommentData> = async (payload) => {
        // post comment here...
        console.log("payload", payload);
        const notification = toast.loading("Posting your comment...", { toastId: "post-loading" });
        await addComment({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: payload.comment,
            },
        });

        setValue("comment", "");

        toast.update(notification, {
            render: "Comment successfully posted!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
        });
    };

    if (getPostLoading)
        return (
            <div className="flex w-full items-center justify-center p-10 text-xl">
                <Jelly size={50} color="#FF4501" />
            </div>
        );

    if (!getPostLoading && error) return <div>Error: {error.message}</div>;

    const post: Post = data?.post;

    return (
        <div className="mx-auto my-7 max-w-5xl">
            <Post post={post} />

            <div className="-mt-1 rounded-b-sm border border-t-0 border-gray-300 bg-white p-5 pl-16">
                <p className="text-sm">
                    Comment as <span className="text-red-500">{session?.user?.name}</span>
                </p>

                <form onSubmit={handleSubmit(handleComment)} action="POST" className="flex flex-col space-y-2">
                    <textarea
                        {...register("comment")}
                        disabled={!session}
                        className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                        placeholder={session ? "What are your thoughts?" : "Please sign into comment"}
                    />

                    {addCommentLoading ? (
                        <div className="flex w-full items-center justify-center p-10 text-xl">
                            <Jelly size={25} color="#FF4501" />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="rounded-full bg-red-500 text-white font-semibold disabled:bg-gray-200 p-2 hover:opacity-80 transition-opacity"
                        >
                            Comment
                        </button>
                    )}
                </form>
            </div>

            <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
                <hr className="py-2" />
                {post?.comments.map((comment) => (
                    <div key={comment.id} className="relative flex items-center space-x-2 space-y-5">
                        <hr className="absolute top-10 left-7 z-0 h-16 border" />
                        <div className="z-50">
                            <Avatar seed={comment.username} />
                        </div>
                        <div className="flex flex-col">
                            <p className="py-2 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">{comment.username}</span>{" "}
                                <TimeAgo date={comment.created_at} />
                            </p>
                            <p className="">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostDetailPage;
