# Reddit Clone

This project is a clone of Reddit, a popular social news aggregation and discussion website, built using modern web development technologies including Next.js, TailwindCSS, TypeScript, GraphQL, Supabase, StepZen, and NextAuth for authentication and authorization.

## Features

-   Login with Google or Reddit: Users can log in to the application using their Google or Reddit account.

-   Add articles: Authenticated users can create new articles by providing a title, content, and selecting a subreddit.

-   View article details: Users can view the details of any article by clicking on its title.

-   Write comments (realtime): Authenticated users can write comments on articles in real-time.

-   Upvotes and downvotes: Users can upvote or downvote any article or comment, which helps to rank them on the website.

-   View posts by subreddit: Users can view the list of posts of a specific subreddit by clicking on its name.

-   Realtime chat (incomplete): This feature is still in development, but it will allow users to chat with each other in real-time.

-   Support for SSG (Static site generation): The application is built using Next.js, which provides support for Static Site Generation. This means that the web pages are generated at build time, resulting in faster page loads and better performance.

## Getting Started

To get started with this project, you will need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/). Once Node is installed, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/mhxx307/reddit-clone.git && cd reddit-clone && npm install # or yarn install if you use yarn as package manager

```

```bash
supabase setup
google api key
reddit api key
```

After installing the dependencies you can start the development server:

```bash
npm run dev # or yarn dev if you use yarn as package manager
npm run build + npm start # if you want run application in production

```

This will start a development server at http://localhost:3000 where you can see the application running in your browser.

## Deployment

This application deploy in [Vercel](https://reddit-clone-gamma-one.vercel.app/)
