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
