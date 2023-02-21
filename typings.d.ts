type Post = {
    username: string;
    user: User;
    title: string;
    subreddit_id: string;
    image: string;
    id: string;
    created_at: string;
    body: string;
    subreddit: Subreddit;
    comments: PostComment[];
    votes: Vote[];
};

type User = {
    name: string;
    image: string;
    id: string;
    email: string;
};

type message = {
    id: string;
    sender_id: string;
    recipient_id: string;
    text: string;
    created_at: string;
};

type PostComment = {
    id: string;
    username: string;
    text: string;
    created_at: string;
};

type Subreddit = {
    topic: string;
    post: Post[];
    id: string;
    created_at: string;
};

type Vote = {
    vote: boolean;
    username: string;
    id: string;
    created_at: string;
};
