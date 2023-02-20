import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`;

export const GET_POSTS = gql`
    query MyQuery {
        postList {
            id
            image
            title
            username
            created_at
            body
            votes {
                id
                created_at
                username
                vote
            }
            subreddit {
                topic
                created_at
                id
            }
            comments {
                created_at
                id
                text
                username
            }
        }
    }
`;

export const GET_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        postListByTopic(topic: $topic) {
            id
            image
            title
            username
            created_at
            body
            votes {
                id
                created_at
                username
                vote
            }
            subreddit {
                topic
                created_at
                id
            }
            comments {
                created_at
                id
                text
                username
            }
        }
    }
`;

export const GET_POST_BY_ID = gql`
    query MyQuery($id: ID!) {
        post(id: $id) {
            id
            image
            title
            username
            created_at
            body
            votes {
                id
                username
                vote
                created_at
            }
            subreddit {
                topic
                created_at
                id
            }
            comments {
                id
                text
                username
                created_at
            }
        }
    }
`;

export const GET_VOTES_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getVotesByPostId(post_id: $post_id) {
            id
            created_at
            username
            vote
            post_id
        }
    }
`;

export const SUBREDDIT_PAGINATED_LIST = gql`
    query MyQuery($first: Int, $after: Int) {
        subredditPaginatedList(first: $first, after: $after) {
            created_at
            id
            topic
        }
    }
`;
