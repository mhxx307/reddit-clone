import Image from "next/image";

function Avatar() {
    return (
        <div className="relative h-10 w-10 rounded-full border-gray-500 bg-white">
            <Image layout="fill" src="https://api.dicebear.com/5.x/adventurer/svg?seed=Loki.svg" alt="avatar" />
        </div>
    );
}

export default Avatar;
