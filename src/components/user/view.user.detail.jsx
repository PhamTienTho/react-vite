import { Drawer } from "antd"
import { useEffect, useState } from "react"



const ViewUserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, userDetail, setUserDetail } = props

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (userDetail) {
            setId(userDetail._id);
            setFullName(userDetail.fullName);
            setEmail(userDetail.email);
            setPhone(userDetail.phone);
        }
    }, [userDetail])

    return (
        <div>
            <Drawer
                width={"40vw"}
                title="Thông tin chi tiết người dùng"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setIsDetailOpen(false);

                }}
                open={isDetailOpen}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>ID: {id}</div>
                    <div>Full name: {fullName}</div>
                    <div>Email: {email}</div>
                    <div>Phone number: {phone}</div>
                    <div>
                        <img
                            style={{ width: "170px" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userDetail?.avatar}`}
                        />
                    </div>
                    <label htmlFor="uploadAvatarBtn"
                        style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "white",
                            borderRadius: "3px",
                            cursor: "pointer",
                            color: "orange",
                            border: "solid 2px orange"
                        }}
                    >Upload File</label>
                    <input type="file" hidden id="uploadAvatarBtn" />
                </div>
            </Drawer>

        </div>
    )
}

export default ViewUserDetail