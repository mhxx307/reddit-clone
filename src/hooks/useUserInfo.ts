import { GET_USER_BY_NAME } from "@/graphql/queries";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

function useUserInfo(): { userInfo: User } {
    const { data: session } = useSession();

    const { data } = useQuery(GET_USER_BY_NAME, {
        variables: { name: session?.user?.name },
    });

    return {
        userInfo: data?.getUserByName,
    };
}

export default useUserInfo;
