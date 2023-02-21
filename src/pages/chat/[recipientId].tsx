import ChatLayout from "@/components/layouts/ChatLayout";

function ChatDetail() {
    return <div>Bla</div>;
}

export default ChatDetail;

// eslint-disable-next-line react/display-name
ChatDetail.Layout = (page: any) => <ChatLayout>{page}</ChatLayout>;
