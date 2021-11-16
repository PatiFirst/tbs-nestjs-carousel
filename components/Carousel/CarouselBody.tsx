import { Col, Divider, Row } from "antd";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Carousel.module.css";

const myLoader = ({ src, width, quality }: any) => {
  return `https://images.unsplash.com/${src}?w=${width}&q=${quality || 80}`;
};

const CarouselBody = ( props: any) => {
  const { body } = props;
  return (
    <>
        <Row key={body.id} align="top" className={styles.carousel_box}>
            <Col span={14}>
              {/* <Image
                loader={myLoader}
                src="photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                alt=""
                width={500}
                height={300}
                className={styles.image}
              /> */}
              <img src={body.imgUrl} alt="test" className={styles.image} />
            </Col>
            <Col span={10} className={styles.text_box}>
              <div>
                <span className={styles.topic}>{body.title}</span>
                <span className={styles.description}>
                  {body.description}
                </span>
              </div>
              <Link href={`https://${body.link}`} >
                <a target="_blank">ดูรายละเอียดเพิ่มเติม</a>
              </Link>
            </Col>
        </Row>
    </>
  );
}



export default CarouselBody;