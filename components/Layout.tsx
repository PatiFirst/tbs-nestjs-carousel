import { LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons"
// import { Layout, Menu } from "antd";
import { Col, Layout, Menu, Modal, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { TOKEN } from "../services/auth/auth.model";
import { getAuthToken } from "../services/auth/auth.service";
import CarouselComponent from "./Carousel/Carousel";
import AddCarousel from "./edit-carousel/AddCarousel";
import TableCarousel from "./edit-carousel/TableCarousel";
import TestAdd from "./edit-carousel/TestAdd";
const { Header, Content } = Layout;

const LayoutComponent = ({ children, admin } :any) => {
    const router = useRouter();

    const onLogout = () => {
        localStorage.removeItem(TOKEN);
        router.push('/');
    }

    return (
        <>
            <Header>
                <Row>
                    <Col span={2} offset={22}>
                        <Menu theme="dark" mode="horizontal">
                            {/* <SubMenu key="User" icon={<UserOutlined />} title="User">
                                <Menu.Item key="logout" icon={<LogoutOutlined/>} onClick={onLogout}>
                                    Log out
                                </Menu.Item>
                            </SubMenu> */}
                            <Menu.Item key="logout" icon={<LogoutOutlined/>} onClick={onLogout}>
                                Log out
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>

            <Content>
                {admin ? (
                    <>
                        <TableCarousel />
                        <AddCarousel />
                        
                        { children }
                    </>
                ) : (
                    <>
                        <div className="container">
                            <CarouselComponent />
                        </div>
                    </>
                )}
            </Content>
        </>
    )
}


export default LayoutComponent;
