import { useState } from "react";
import { Button, Col, Input, Layout, Menu, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from 'react-icons/fa';
import dashboard from "../Assests/WhatsApp Image 2024-09-24 at 13.50.39_6fc882b8.jpg";
import image from "../Assests/WhatsApp Image 2024-09-24 at 13.50.56_234ce64f.jpg";
import image1 from "../Assests/WhatsApp Image 2024-09-24 at 13.50.39_54c179b6.jpg";
import image2 from "../Assests/WhatsApp Image 2024-09-24 at 13.50.40_a9fbb2a0.jpg";
import image3 from "../Assests/WhatsApp Image 2024-09-24 at 13.50.39_6fc882b8.jpg";
import image4 from "../Assests/WhatsApp Image 2024-09-24 at 13.50.39_3134ae9a.jpg";
import image5 from "../Assests/WhatsApp Image 2024-09-24 at 13.42.03_8175b945.jpg";
import bellimage from "../Assests/WhatsApp Image 2024-09-24 at 13.50.40_ae763f67.jpg";
import setting from "../Assests/setting.png";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const Navigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    localStorage.setItem("selectedKey", key);
    console.log("Selected key:", key);
  };

  const userType = localStorage.getItem("userType");

  const items: any = [
    {
      key: "1",
      icon: <img src={dashboard} width="20px" height="20px" alt="Dashboard Icon" style={{ right: "25px", position: "relative" }} />,
      label: "Dashboard",
      onClick: () => Navigate("/dash"),
    },
    {
      key: "2",
      icon: <img src={image} width="20px" height="20px" alt="Device Icon" style={{ right: "25px", position: "relative" }} />,
      label: "Device",
    },
    {
      key: "3",
      icon: <img src={image1} width="20px" height="20px" alt="User Icon" style={{ right: "25px", position: "relative" }} />,
      label: "User",
    },
    {
      key: "4",
      label: "Reports",
      icon: <img src={image2} width="20px" height="20px" alt="Reports Icon" style={{ right: "25px", position: "relative" }} />,
      children: [
        {
          key: "5",
          label: "Reading Report",
          icon: <img src={image3} width="20px" height="20px" alt="Reading Report Icon" style={{ right: "25px", position: "relative" }} />,
        },
        userType === "2" || userType === "1"
          ? {
            key: "6",
            label: "Consumption Report",
            icon: <img src={image4} width="20px" height="20px" alt="Consumption Report Icon" style={{ right: "25px", position: "relative" }} />,
          }
          : null,
        {
          key: "7",
          label: "History Report",
          icon: <img src={image5} width="20px" height="20px" alt="History Report Icon" style={{ right: "25px", position: "relative" }} />,
        },
        {
          key: "8",
          label: "Notification Report",
          icon: <img src={image5} width="20px" height="20px" alt="Notification Report Icon" style={{ right: "25px", position: "relative" }} />,
          onClick: () => Navigate("/history"),
        },
        {
          key: "10",
          label: "Failure Analysis",
          icon: <img src={image1} width="20px" height="20px" alt="Failure Analysis Icon" style={{ right: "25px", position: "relative" }} />,
          onClick: () => Navigate("/notification"),
        },
      ].filter(Boolean),
    },
    {
      key: "11",
      icon: <img src={image2} width="20px" height="20px" alt="Subscription Icon" style={{ right: "25px", position: "relative" }} />,
      label: "Subscription",
    },
    {
      key: "12",
      icon: <img src={image3} width="20px" height="20px" alt="Logout Icon" style={{ right: "25px", position: "relative" }} />,
      label: "Logout",
      onClick: handleLogout,
    },
  ].filter(Boolean); // filter out any null or undefined items

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#2fa49f" }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        breakpoint="lg"
        collapsedWidth={80}
        width={180} // Reduced width
        style={{ backgroundColor: "#2fa49f" }} // Change sidebar color to green
      >
        <Menu mode="inline" items={items} onSelect={handleMenuSelect} className="mt-4" />
      </Sider>

      <Layout className="mt-3 me-3 mb-3">
        <Header
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 20px #2fa49f",
            border: "3px solid yellow",
          }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} md={12} style={{ display: "flex", alignItems: "center" }}>
              <h4 className="text-dark mb-0" style={{ marginRight: "20px" }}>Reports</h4>
              <Input value="MAE136" className="w-50" style={{ marginRight: "10px" }} />
              <Input value="Elmaesure" className="w-50" />
            </Col>

            <Col xs={24} md={12}>
              <Row justify="end" align="middle" gutter={[8, 8]}>
                <img src={bellimage} height={20} className="mx-2" alt="Notification" />
                <img src={setting} className="mx-2" height={20} alt="Settings" />
                <p className="mb-0 mx-2">Mae User</p>
                <Col xs={2} sm={2} md={2}>
                  <FaUserCircle size={30} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>

        <Content style={{ borderRadius: "5px" }} className="mt-2 ms-2 me-2 mb-3">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
