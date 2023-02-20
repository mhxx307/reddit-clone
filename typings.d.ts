type Comment = {
    username: string;
    text: string;
    post_id: number;
    post: Post;
    id: string;
    created_at: string;
};

type Post = {
    username: string;
    title: string;
    subreddit_id: string;
    image: string;
    id: string;
    created_at: string;
    body: string;
    subreddit: Subreddit;
    comments: Comment[];
    votes: Vote[];
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
    post_id: string;
    post: Post;
    id: string;
    created_at: string;
};
