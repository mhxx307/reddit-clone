import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Auth({ children }: { children: any }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/");
            toast.error("You need to login first", {
                toastId: "auth",
            });
        }
    }, [router]);

    if (status === "loading")
        return (
            <div className="flex w-full items-center justify-center p-10 text-xl">
                <Jelly size={50} color="#FF4501" />
            </div>
        );

    return <>{children}</>;
}

export default Auth;
