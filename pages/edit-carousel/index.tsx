import { Modal } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head'
import { useEffect } from 'react';
import CarouselComponent from '../../components/Carousel/Carousel';
import LayoutComponent from '../../components/Layout'
import { getAuthToken } from '../../services/auth/auth.service';
import styles from '../../styles/Edit.module.css'

const jwt = require('jsonwebtoken')


export default function index() {
    const router = useRouter();

    useEffect(() => {
        const token = getAuthToken();
        if(token){
            const json = jwt.decode(token) as { [key: string]: string };
            if (!json && json.role !== 'admin') {
                Modal.error({
                    title: 'Only Admin'
                });
                router.push('/admin');
            } else if (json.role !== 'admin' && json.role === 'user') {
                Modal.error({
                    title: 'You not Admin'
                });
                router.push('/carousel');
            }
        } else {
            Modal.error({
                title: 'Please Login'
            });
            router.push('/admin');
        }
        
    }, [])
    
    return (
        <LayoutComponent admin>
            <Head>
                <title>Edit-Carousel</title>
                <meta name="description" content="Edit-Carousel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <CarouselComponent />
            </div>
        </LayoutComponent>
    )
}
