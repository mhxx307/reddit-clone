import { useSession } from "next-auth/react";
import { Avatar, InputField } from "components";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "graphql/mutations";
import client from "libs/apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "graphql/queries";
import { toast } from "react-toastify";

interface PostData {
    title: string;
    body?: string;
    subreddit?: string;
    imageURL?: string;
}

const schema = yup
    .object({
        title: yup.string().required(),
        subreddit: yup.string().required(),
    })
    .required();

function PostBox() {
    const { data: session } = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const [addPost] = useMutation(ADD_POST);
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const { register, setValue, handleSubmit, watch, control } = useForm<PostData>({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        defaultValues: {
            title: "",
            body: "",
            subreddit: "",
            imageURL: "",
        },
    });

    const handleCreatePost = async (payload: PostData) => {
        console.log("payload", payload);
        const notification = toast.loading("Creating a post...", { toastId: "post-loading" });

        try {
            // Query for the subreddit topic
            const {
                data: { getSubredditByTopic },
            } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: { topic: payload.subreddit },
            });

            if (!getSubredditByTopic) {
                // create the subreddit
                console.log("subreddit is new! => creating a subreddit!");

                const {
                    data: { insertSubreddit: newSubreddit },
                } = await addSubreddit({
                    variables: {
                        topic: payload.subreddit,
                    },
                });

                console.log("creating a post...", payload);
                const image = payload.imageURL || "";

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        title: payload.title,
                        body: payload.body,
                        subreddit_id: newSubreddit.id,
                        imageURL: image,
                        username: session?.user?.name,
                    },
                });

                console.log("New post created!", newPost);
            } else {
                // use existing subreddit...
                console.log("Subreddit already exist! => using existing subreddit...");
                console.log("Subreddit list:", getSubredditByTopic);
                const image = payload.imageURL || "";

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        title: payload.title,
                        body: payload.body,
                        subreddit_id: getSubredditByTopic.id,
                        imageURL: image,
                        username: session?.user?.name,
                    },
                });

                console.log("New post created!", newPost);
            }

            // after creating a post, reset the form
            setValue("title", "");
            setValue("body", "");
            setValue("subreddit", "");
            setValue("imageURL", "");

            setImageBoxOpen(false);
            toast.update(notification, {
                render: "New post created!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            console.log("error", error);
            toast.update(notification, {
                render: "Whoops something is wrong!!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <form
            method="POST"
            className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
            onSubmit={handleSubmit(handleCreatePost)}
        >
            <div className="flex items-center space-x-3">
                <Avatar large />

                <InputField
                    name="title"
                    control={control}
                    disabled={!session}
                    type="text"
                    placeholder={session ? "Create a post to entering a tittle" : "Sign in to post"}
                />

                <PhotoIcon
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`h-6 cursor-pointer text-gray-300 ${imageBoxOpen && "text-blue-300"}`}
                />
                <LinkIcon className="h-6 text-gray-300" />
            </div>

            {!!watch("title") && (
                <div className="flex flex-col py-2">
                    {/* body */}
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">body:</p>
                        <InputField
                            isTextArea
                            name="body"
                            control={control}
                            type="text"
                            placeholder="Text (Optional)"
                        />
                    </div>

                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit:</p>
                        <InputField
                            name="subreddit"
                            control={control}
                            type="text"
                            placeholder="i.e. programming, reactjs, etc."
                        />
                    </div>

                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <InputField name="imageURL" control={control} type="text" placeholder="Optional..." />
                        </div>
                    )}

                    {!!watch("title") && (
                        <button type="submit" className="w-full rounded-full bg-blue-400 p-2 text-white">
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    );
}

export default PostBox;
