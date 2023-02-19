import { useSession } from "next-auth/react";
import { Avatar, InputField } from "components";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

    const { register, setValue, handleSubmit, watch, control } = useForm<PostData>({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const handleCreatePost = async (payload: PostData) => {
        console.log(payload);
    };

    return (
        <form
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
                    className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
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
                            name="body"
                            control={control}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="Text (Optional)"
                        />
                    </div>

                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit:</p>
                        <InputField
                            name="subreddit"
                            control={control}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="i.e. programming, reactjs, etc."
                        />
                    </div>

                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <InputField
                                name="imageURL"
                                control={control}
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                type="text"
                                placeholder="Optional..."
                            />
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
