import LoginAdmin from '../../components/Auth/LoginAdmin'
import Head from 'next/dist/shared/lib/head'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';

const jwt = require('jsonwebtoken')

export default function AdminLogin() {
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token && token !== undefined){
            const json = jwt.decode(token) as { [key: string]: string };

            if (json.role === 'admin') {
                router.push('/edit-carousel');
            } else {
                router.push('/carousel');
            }
        }
    }), [];

    return (
        <div className="container">
            <Head>
                <title>TBS-Carousel-Admin</title>
                <meta name="description" content="Admin login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <LoginAdmin />
        </div>
    )
}
