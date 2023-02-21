import ChatLayout from "@/components/layouts/ChatLayout";

function chat() {
    return (
        <div className="flex justify-center items-center mt-5">
            <p>Hello, No chat here</p>
        </div>
    );
}

export default chat;

// eslint-disable-next-line react/display-name
chat.Layout = (page: any) => <ChatLayout>{page}</ChatLayout>;
