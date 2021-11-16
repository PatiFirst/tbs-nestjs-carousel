import Head from "next/head";
import RegisterUser from '../../components/Auth/RegisterUser'

export default function AdminLogin() {
    return (
        <>
            <Head>
                <title>TBS-Carousel-Register</title>
                <meta name="description" content="Register to Login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <RegisterUser />
            </div>
        </>
        
    )
}
