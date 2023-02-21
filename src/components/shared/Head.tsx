import { WEBSITE_URL } from "@/constants";
import { useRouter } from "next/router";
import NextHead from "next/head";

interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function Head(props: HeadProps) {
    const {
        title = "Teddy",
        description = "Teddy - A entertainmain app like reddit, have chat, post,... Built with NextJS, TailwindCSS, Supabase,...",
        image, // sau này để hình banner home
    } = props;

    const { asPath } = useRouter();

    return (
        <NextHead>
            <title>{title}</title>
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico" />

            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={WEBSITE_URL + asPath} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={WEBSITE_URL + asPath} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="SecondChance" />
            <meta name="apple-mobile-web-app-title" content="SecondChance" />
            <meta name="theme-color" content="#EF4444" />
            <meta name="msapplication-navbutton-color" content="#EF4444" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="msapplication-starturl" content="/" />
        </NextHead>
    );
}
