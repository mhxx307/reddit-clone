import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SubredditRowProps {
    index: number;
    topic: string;
}

function SubredditRow({ index, topic }: SubredditRowProps) {
    return (
        <div className="flex items-center space-x-2 border-t px-4 py-2 last:rounded-b">
            <p>{index + 1}</p>
            <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
            <p className="flex-1 truncate">r/{topic}</p>
            <Link href={`subreddit/${topic}`}>
                <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white hover:bg-opacity-80 transition-opacity">
                    View
                </div>
            </Link>
        </div>
    );
}

export default SubredditRow;
