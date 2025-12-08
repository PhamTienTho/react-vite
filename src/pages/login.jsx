import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const onFinish = async (value) => {
        setLoading(true);
        const res = await loginAPI(value.email, value.password)
        if(res.data){
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        }
        else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
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
                        form={form}
                    >
                        
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Email" />
                                </Form.Item>
                            
                        
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" 
                                        onKeyDown={(event) => {
                                            if(event.key === 'Enter'){
                                                form.submit();
                                            }
                                        }}
                                    />
                                </Form.Item>
                           
                        
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button type="primary"
                                        loading={loading}
                                        onClick={() => form.submit()}>Login</Button>
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