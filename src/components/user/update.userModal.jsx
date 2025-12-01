import { useState } from "react";
import { createUserAPI } from "../../services/api.service";
import { Input, notification, Modal } from "antd";

const UpdateUserModal = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, passWord, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            });
            resetAndClearModal();
            // await loadUser();
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
        <Modal
            title="Update User"
            open={isModalOpen}
            onOk={() => {
                handleSubmitBtn();
            }}
            onCancel={() => { resetAndClearModal() }}
            maskClosable={false}
            okText={"SAVE"}
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
    )
}

export default UpdateUserModal;