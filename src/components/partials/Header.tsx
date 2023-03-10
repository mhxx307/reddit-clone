import Image from "next/image";
import { ChevronDownIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
    BellIcon,
    ChatBubbleLeftIcon,
    GlobeAltIcon,
    PlusIcon,
    SparklesIcon,
    SpeakerWaveIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { DropdownMenu } from "../shared";

function Header() {
    const [isOpen, setOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm justify-between">
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
                <Link href="/">
                    <Image
                        src="/teddyl.png"
                        alt="logo"
                        className="object-contain w-full h-full"
                        width={1}
                        height={1}
                        sizes="100%"
                    />
                </Link>
            </div>

            <div className="mx-7 flex items-center xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>

            {/* Search box */}
            <form className="hidden xl:flex flex-1 items-center space-x-2 border border-gray-200 bg-gray-100 px-3 py-1">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                <input type="text" placeholder="Search Reddit" className="flex-1 bg-transparent outline-none" />
                <button type="submit" hidden />
            </form>

            <div className="text-gray-500 mx-5 space-x-2 hidden lg:inline-flex items-center">
                <SparklesIcon className="icon" />
                <GlobeAltIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <Link href="/chat">
                    <ChatBubbleLeftIcon className="icon" />
                </Link>
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerWaveIcon className="icon" />
            </div>

            <div className="lg:hidden ml-5 flex items-center">
                {/* <Hamburger toggled={isOpen} toggle={setOpen} size={20} /> */}
                <DropdownMenu />
            </div>

            {session ? (
                <div
                    onClick={() => signOut()}
                    className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer hover:opacity-60 transition-opacity"
                >
                    <div className="relative h-5 w-5 flex-shrink-0">
                        <Image
                            src="/teddy.png"
                            alt="sign"
                            className="object-contain w-full h-full"
                            width={1}
                            height={1}
                            sizes="100%"
                        />
                    </div>
                    <div className="flex-1 text-xs">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400">Logout</p>
                    </div>

                    <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
                </div>
            ) : (
                <div
                    onClick={() => signIn()}
                    className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer hover:opacity-60 transition-opacity"
                >
                    <div className="relative h-5 w-5 flex-shrink-0">
                        <Image
                            src="/teddy.png"
                            alt="sign"
                            className="object-contain h-full w-full"
                            width={1}
                            height={1}
                            sizes="100%"
                        />
                    </div>
                    <p className="text-gray-400">Login</p>
                </div>
            )}
        </div>
    );
}

export default Header;
