import { useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GET_USER_BY_NAME } from "graphql/queries";
import { useSession } from "next-auth/react";
import { Fragment, memo, useState } from "react";

interface DialogProps {
    closeModal: () => void;
    isOpen: boolean;
}

function MyDialog({ closeModal, isOpen }: DialogProps) {
    const [username, setUsername] = useState("");
    const { data: session } = useSession();

    // const { data: recipientUser } = useQuery(GET_USER_BY_NAME, {
    //     variables: {
    //         name: username,
    //     },
    // });

    // console.log(recipientUser);

    function handleCreateConversation() {
        console.log("Username", username);
        if (!username) return;

        const isInvitingSelf = session?.user?.name === username;

        if (!isInvitingSelf) {
            // add conversation to db
        }

        closeModal();
    }

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
                                    </div>
                                </div>

                                <div className="mt-4 flex space-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                        onClick={handleCreateConversation}
                                    >
                                        Enter
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
