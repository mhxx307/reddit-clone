import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Auth, Avatar, ConversationList, StartConversationDialog } from "components";
import { useCallback, useState } from "react";

function chat() {
    let [isOpen, setIsOpen] = useState(true);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    return (
        // <Auth>
        <div className="grid grid-cols-10 bg-white p-3 min-h-[calc(100%-58px)]">
            {/* sidebar */}
            <div className="col-span-2 space-y-4">
                {/* header */}
                <div className="flex justify-between items-center">
                    <Avatar />
                    <EllipsisVerticalIcon className="w-6 h-6 cursor-pointer" />
                </div>

                {/* chat */}
                <div>
                    {/* search conversation */}
                    <form className="flex flex-1 items-center space-x-2 border border-gray-200 bg-gray-100 px-3 py-1">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in conversation"
                            className="flex-1 bg-transparent outline-none"
                        />
                        <button type="submit" hidden />
                    </form>

                    {/* start conversation button */}
                    <button
                        className="p-2 text-blue-400 hover:bg-gray-200 transition-colors flex justify-center items-center w-full font-bold"
                        onClick={() => openModal()}
                    >
                        Start a new conversation
                    </button>

                    <hr />

                    {/* conversation list */}
                    <div className="space-y-4 mt-5">
                        <ConversationList />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="col-span-8">
                <StartConversationDialog closeModal={closeModal} isOpen={isOpen} />
            </div>
        </div>
        // </Auth>
    );
}

export default chat;
