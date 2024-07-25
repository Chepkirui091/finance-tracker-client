import Head from "next/head";
import Login from "@/components/@page-components/login";

export default function Home() {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page" />
            </Head>
            <div style={{ height: '100vh', width: '100%',backgroundImage: 'url(/static/login.jpg)', }}>
                <Login />
            </div>
        </>
    );
}
