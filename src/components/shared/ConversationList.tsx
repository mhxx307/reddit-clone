import Avatar from "./Avatar";
import Link from "next/link";
import { GET_CONTACT_LIST_BY_SENDER_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useUserInfo } from "@/hooks";

function ConversationList() {
    const { userInfo: sender } = useUserInfo();

    const { data: contactList } = useQuery(GET_CONTACT_LIST_BY_SENDER_ID, {
        variables: { sender_id: sender?.id },
    });

    const router = useRouter();
    const { recipientId } = router.query;

    return (
        <>
            {contactList?.getContactListBySenderId?.map(
                (contact: any) =>
                    contact.recipient.name !== sender?.name && (
                        <Link
                            key={contact.id}
                            href={`chat/${contact.recipient.id}`}
                            className={`flex items-center cursor-pointer hover:bg-gray-200 transition-colors py-2 ${
                                recipientId === contact.recipient.id && "bg-gray-200"
                            }`}
                        >
                            {contact.recipient.image ? (
                                <Avatar image={contact.recipient.image} />
                            ) : (
                                <Avatar seed={contact.recipient.name} />
                            )}
                            <p className="ml-5 text-sm">{contact.recipient.name}</p>
                        </Link>
                    )
            )}
        </>
    );
}

export default ConversationList;
