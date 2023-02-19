import { useSession } from "next-auth/react";
import { Avatar } from "components";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";

function PostBox() {
    const { data: session } = useSession();

    return (
        <form className="sticky top-16 z-50 bg-white rounded-md border border-gray-300 p-2">
            <div className="flex items-center space-x-3">
                <Avatar />

                <input
                    disabled={!session}
                    type="text"
                    placeholder={session ? "Create a tittle" : "Sign in to post"}
                    className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
                />

                <PhotoIcon className={`h-6 cursor-pointer text-gray-300`} />
                <LinkIcon className="h-6 text-gray-300" />
            </div>
        </form>
    );
}

export default PostBox;
