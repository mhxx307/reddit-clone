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

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $text: String!, $username: String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            id
            username
            text
            post_id
            created_at
        }
    }
`;

export const ADD_VOTE = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $vote: Boolean!) {
        insertVote(post_id: $post_id, username: $username, vote: $vote) {
            id
            username
            vote
            post_id
            created_at
        }
    }
`;

export const ADD_MESSAGE = gql`
    mutation MyMutation($recipient_id: ID!, $sender_id: ID!, $text: String!) {
        insertMessage(recipient_id: $recipient_id, sender_id: $sender_id, text: $text) {
            id
            created_at
        }
    }
`;
