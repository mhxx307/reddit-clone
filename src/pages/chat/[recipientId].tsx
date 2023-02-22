import { ChatLayout } from "@/components/layouts";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_MESSAGES_BETWEEN_SENDER_AND_RECIPIENT } from "@/graphql/queries";
import { supabaseClient } from "@/libs/supabase";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/hooks";
import { useForm } from "react-hook-form";
import { ADD_MESSAGE } from "@/graphql/mutations";

function ChatDetail() {
    const {
        query: { recipientId },
    } = useRouter();
    const { userInfo: sender } = useUserInfo();

    const { data, refetch: refetchMessage } = useQuery(GET_MESSAGES_BETWEEN_SENDER_AND_RECIPIENT, {
        variables: { sender_id: sender?.id, recipient_id: recipientId },
    });

    const [addMessage, { loading }] = useMutation(ADD_MESSAGE);

    const { register, handleSubmit, setValue } = useForm<{
        message: string;
    }>();

    useEffect(() => {
        const subscription = supabaseClient
            .channel("message")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "message",
                },
                (payload) => {
                    console.log(payload);
                    refetchMessage();
                }
            )
            .subscribe();

        return () => {
            supabaseClient.removeChannel(subscription);
        };
    }, []);

    const sendMessage = async (payload: { message: string }) => {
        console.log(payload);
        await addMessage({
            variables: {
                sender_id: sender?.id,
                recipient_id: recipientId,
                text: payload.message,
            },
        });

        setValue("message", "");
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="space-y-4 overflow-y-auto">
                {data?.getMessagesBetweenSenderAndRecipient.map((message: any) => (
                    <div key={message.id} className="flex">
                        <span
                            className={`font-bold text-sm w-[200px] break-words mr-4 ${
                                sender.name === message.sender.name ? "text-blue-400" : "text-black"
                            }`}
                        >
                            {message.sender.name}
                        </span>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <form className="flex" onSubmit={handleSubmit(sendMessage)}>
                <input
                    type="text"
                    {...register("message")}
                    placeholder="Write your message"
                    className="shrink bg-transparent outline-none w-full bg-slate-300 p-2 mr-4 rounded-md"
                />
                <button
                    type="submit"
                    className=" bg-blue-400 text-white rounded-md flex justify-center items-center w-40 py-4"
                >
                    <p>Send message</p>
                </button>
            </form>
        </div>
    );
}

export default ChatDetail;

// eslint-disable-next-line react/display-name
ChatDetail.Layout = (page: any) => <ChatLayout>{page}</ChatLayout>;
