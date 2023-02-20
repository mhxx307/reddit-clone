type Post = {
    username: string;
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
