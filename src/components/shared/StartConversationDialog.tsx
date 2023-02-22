import { useApolloClient } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Fragment, memo, useState } from "react";
import { toast } from "react-toastify";

import { GET_MESSAGES_BETWEEN_SENDER_AND_RECIPIENT, GET_USER_BY_NAME } from "@/graphql/queries";
import Avatar from "./Avatar";
import { useRouter } from "next/router";
import { useUserInfo } from "@/hooks";

interface DialogProps {
    closeModal: () => void;
    isOpen: boolean;
}

function MyDialog({ closeModal, isOpen }: DialogProps) {
    const [username, setUsername] = useState("");
    const [userSearch, setUserSearch] = useState<User>();
    const { data: session } = useSession();
    const client = useApolloClient();
    const router = useRouter();

    const { userInfo: sender } = useUserInfo();

    const handleSearchUser = async () => {
        if (!username) return;
        const { data } = await client.query({
            query: GET_USER_BY_NAME,
            variables: { name: username },
        });

        if (data?.getUserByName?.name === session?.user?.name) {
            toast.error("You can't invite yourself", {
                toastId: "invite-self",
            });
            return;
        }

        if (!data.getUserByName) {
            toast.error("User not found", {
                toastId: "user-not-found",
            });
            return;
        }

        setUserSearch(data.getUserByName);
        console.log("user search result: ", userSearch);
    };

    const handleCreateConversation = async () => {
        console.log("Username: ", username);
        if (!username) return;

        const isInvitingSelf = session?.user?.name === username;

        if (!isInvitingSelf) {
            // Check if a conversation between the two users exists
            const { data: existingMessages } = await client.query({
                query: GET_MESSAGES_BETWEEN_SENDER_AND_RECIPIENT,
                variables: { sender_id: sender?.id, recipient_id: userSearch?.id },
            });

            if (existingMessages?.getMessagesBetweenSenderAndRecipient?.length > 0) {
                console.log("Conversation already exists");
                router.push(`/chat/${userSearch?.id}`);
                closeModal();
                return;
            }

            console.log("conversation does not exist");
            router.push(`/chat/${userSearch?.id}`);
        } else {
            return;
        }

        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    New chat
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Please enter a username of the person you want to chat with.
                                    </p>
                                </div>

                                <div className="mt-2">
                                    {/* search conversation */}
                                    <div className="flex flex-1 items-center space-x-2 border border-gray-200 bg-gray-100 px-3 py-1">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            className="flex-1 bg-transparent outline-none"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        {username && (
                                            <button onClick={handleSearchUser} type="button">
                                                Search
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {userSearch && (
                                    <div className="mt-4 flex items-center space-x-2">
                                        {userSearch.image ? (
                                            <Avatar image={userSearch?.image} />
                                        ) : (
                                            <Avatar seed={userSearch?.name} />
                                        )}
                                        <p
                                            onClick={handleCreateConversation}
                                            className="cursor-pointer text-xs hover:text-blue-400 transition-colors"
                                        >
                                            Add user
                                        </p>
                                    </div>
                                )}

                                <div className="mt-4 flex space-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(MyDialog);
