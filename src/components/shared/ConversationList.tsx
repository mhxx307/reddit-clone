import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import { GET_USER_BY_NAME } from "@/graphql/queries";
import { useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import { supabaseClient } from "@/libs/supabase";

function ConversationList() {
    const client = useApolloClient();
    const [contactList, setContactList] = useState<any>();
    const { data: session } = useSession();

    useEffect(() => {
        // Get a list of all the recipient IDs that the user has chatted with
        (async () => {
            const { data } = await client.query({
                query: GET_USER_BY_NAME,
                variables: { name: session?.user?.name },
            });

            const sender = data.getUserByName;
            console.log("user sender: ", sender);

            const { data: contacts, error } = await supabaseClient
                .from("message")
                .select("*")
                .eq("sender_id", sender?.id);

            console.log("contact list: ", contacts);
            setContactList(contacts);
        })();
    }, [contactList]);

    return (
        <>
            {contactList?.map((contact: any) => (
                <Link
                    key={contact.id}
                    href={`chat/123`}
                    className="flex items-center cursor-pointer hover:bg-gray-200 transition-colors py-2"
                >
                    <Avatar />
                    <p className="ml-5 text-sm">Username or email</p>
                </Link>
            ))}
        </>
    );
}

export default ConversationList;
