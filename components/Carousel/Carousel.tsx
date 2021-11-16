import { Carousel, CarouselProps, Col, Divider, Modal, Row } from "antd";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCarousel } from "../../services/carousel/carousel.service";
import styles from "../../styles/Carousel.module.css";
import CarouselBody from "./CarouselBody";

const CarouselComponent = () => {
  const [bodies, setBody] = useState<CarouselProps[]>([]);

  useEffect(() => {
    getAllCarousel()
    .then((res: any) => {
      setBody(res?.data)
    })
    .catch((e) => {
      const content = e instanceof Error ? e.toString() : e?.response?.data?.message || null;
      Modal.error({
        title: content
      })
    })
  }, [])
  
  return (
        <div className={styles.carousel}>
          <Carousel autoplay>
            { bodies.map((body) => {
              return (
                <CarouselBody body={body} />
              )
              }) 
            }
          </Carousel>
        </div>
  );
}


export default CarouselComponent;