import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const onFinish = (value) => {
        console.log("check >>> ", value)
    }

    return (

        <Row justify={"center"} style={{ marginTop: "30px"}}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    boder: "1px solic #ccc",
                    borderRadius: "5px"
                }}> 
                    <legend>Đăng nhập</legend>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        style={{ margin: "30px" }}
                    >
                        
                                <Form.Item
                                    name="Email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Email" />
                                </Form.Item>
                            
                        
                                <Form.Item
                                    name="Password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                                </Form.Item>
                           
                        
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button type="primary"
                                        htmlType="submit">Login</Button>
                                    <Link to={'/'}>Go to home page <ArrowRightOutlined /></Link>
                                </div>
                            
                        <Divider dashed />
                        <div style={{textAlign: "center"}}>Chưa có tài khoản ? <Link to="/register">Đăng ký tại đây</Link></div>
                    </Form>
                </fieldset>
            </Col>
        </Row>



    )
}

export default LoginPage;