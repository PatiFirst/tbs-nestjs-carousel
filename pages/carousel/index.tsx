import Head from "next/head";
import CarouselComponent from "../../components/Carousel/Carousel";
import styles from '../../styles/Carousel.module.css'
import { Layout, Menu, Modal } from "antd";
import LayoutComponent from "../../components/Layout";
import { useEffect } from "react";
import { getAuthToken } from "../../services/auth/auth.service";
import { useRouter } from "next/dist/client/router";

export default function index() {
    const router = useRouter();

    useEffect(() => {
        const token = getAuthToken();
        if(!token){
            Modal.error({
                title: 'Please Login'
            });
            router.push('/');
        }
    }, [])

    return (
        <LayoutComponent>
            <Head>
                <title>TBS-Carusel</title>
                <meta name="description" content="TBS-Carousel Test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                
        </LayoutComponent> 
    )
}
