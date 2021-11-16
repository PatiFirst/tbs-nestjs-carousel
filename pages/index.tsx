import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import LoginUser from "../components/Auth/LoginUser";

const jwt = require('jsonwebtoken')


const Home: NextPage = () => {

  const router = useRouter();

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token && token !== undefined){
          const json = jwt.decode(token) as { [key: string]: string };

          if (json.role === 'user') {
            router.push('/carousel');
          } else {
            router.push('/edit-carousel');
          }
      }
    }), [];

  return (
    <div className="container">
      <Head>
        <title>TBS-Carousel-Login</title>
        <meta name="description" content="Login to TBS-Carousel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginUser/>
    </div>
  );
};

export default Home;
