import { Layout, Menu } from "antd";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const MainLayout: FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Header style={{ position: "fixed", width: "100%", zIndex: 1 }}>
        <Menu mode="horizontal" defaultSelectedKeys={["Auth"]} theme="dark">
          <Menu.Item key={"Auth"}>
            <Link to={"/"}>Auth</Link>
          </Menu.Item>
          <Menu.Item key={"Todos"}>
            <Link to={"/todos"}>Todos</Link>
          </Menu.Item>
          <Menu.Item key={"Posts"}>
            <Link to={"/posts"}>Posts</Link>
          </Menu.Item>
          <Menu.Item key={"Chart"}>
            <Link to={"/chart"}>Chart</Link>
          </Menu.Item>
          <Menu.Item key={"Graf"}>
            <Link to={"/graf"}>Graph</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          marginTop: 64,
          padding: 20,
          paddingBottom: 0,
        }}
      >
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "fff" }}>
        Simple AntDesign App
      </Footer>
    </Layout>
  );
};
