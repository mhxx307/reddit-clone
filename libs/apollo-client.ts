import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface ApolloPageProps {
    [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: "https://mizhhiria.stepzen.net/api/unrealistic-donkey/__graphql", // Server URL (must be absolute)
    // credentials: "include", // Additional fetch() options like `credentials` or `headers`
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache({}),
    });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: { props: ApolloPageProps }) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: ApolloPageProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}

// const client = new ApolloClient({
//     uri: "https://mizhhiria.stepzen.net/api/unrealistic-donkey/__graphql",
//     headers: {
//         Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
//     },
//     cache: new InMemoryCache(),
// });

// export default client;
