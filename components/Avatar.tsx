import { useSession } from "next-auth/react";
import Image from "next/image";

interface AvatarProps {
    seed?: string;
    large?: boolean;
}

function Avatar({ seed, large }: AvatarProps) {
    const { data: session } = useSession();
    return (
        <div
            className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-500 bg-white ${
                large && "h-20 w-20"
            }`}
        >
            <Image
                layout="fill"
                src={
                    session?.user?.image
                        ? session?.user?.image
                        : `https://api.dicebear.com/5.x/open-peeps/png?seed=${
                              seed || session?.user?.name || "placeholder"
                          }`
                }
                alt="avatar"
                className="object-cover flex-shrink-0"
            />
        </div>
    );
}

export default Avatar;
