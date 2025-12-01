import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import axios from "axios";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {

    const {loadUser} = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, passWord, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            });
            resetAndClearModal();
            await loadUser();
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndClearModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassWord("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>


            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Tables Users</h3>
                <Button
                    type="primary"
                    onClick={() => { setIsModalOpen(true) }}>Create User</Button>
            </div>

            <Modal
                title="Create Table"
                open={isModalOpen}
                onOk={() => {
                    handleSubmitBtn();
                }}
                onCancel={() => { resetAndClearModal() }}
                maskClosable={false}
                okText={"CREATE"}
            >

                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={passWord}
                            onChange={(event) => { setPassWord(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                </div>

            </Modal>

        </div>

    )
}

export default UserForm;