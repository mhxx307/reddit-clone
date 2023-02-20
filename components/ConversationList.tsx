import Avatar from "./Avatar";

function ConversationList() {
    return (
        <div className="flex items-center">
            <Avatar />
            <p className="ml-5 text-sm">Username or email</p>
        </div>
    );
}

export default ConversationList;
