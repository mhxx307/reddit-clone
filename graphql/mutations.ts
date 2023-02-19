import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation($body: String, $image: String, $subreddit_id: ID!, $title: String!, $username: String!) {
        insertPost(body: $body, image: $image, subreddit_id: $subreddit_id, title: $title, username: $username) {
            id
            subreddit {
                id
                topic
            }
            body
            username
            title
        }
    }
`;

export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!) {
        insertSubreddit(topic: $topic) {
            id
            created_at
            topic
        }
    }
`;
