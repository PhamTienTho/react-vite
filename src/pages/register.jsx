import { Button, Input, Form, notification, Row, Col, Divider } from "antd"
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async (value) => {
        console.log("check >>>", value)
        const res = await registerUserAPI(
            value.username,
            value.email,
            value.password,
            value.phone
        );
        if (res.data) {
            notification.success(
                {
                    message: "Register user",
                    description: "Đăng ký user thành công"
                }
            )
            navigate('/login');
        }
        else {
            notification.error(
                {
                    message: "Register user error",
                    description: JSON.stringify(res.message)
                }
            )
        }
    }

    return (
        
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <h3 style={{textAlign: "center", margin: "20px", fontSize: "25px"}}>Đăng ký tài khoản</h3>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button
                            // onClick={() => { form.submit() }} 
                            htmlType="submit"
                            type="primary">Register</Button>
                    </div>
                       <Divider dashed />
                       <div>Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></div>
                </Col>
            </Row>

        </Form>
    )
}

export default RegisterPage;