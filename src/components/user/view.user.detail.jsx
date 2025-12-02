import { Drawer } from "antd"
import { useEffect, useState } from "react"



const ViewUserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, userDetail, setUserDetail } = props

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect( () => {
        if(userDetail) {
            setId(userDetail._id);
            setFullName(userDetail.fullName);
            setEmail(userDetail.email);
            setPhone(userDetail.phone);
        }
    })

    return (
        <div>
            <Drawer
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
                </div>
            </Drawer>

        </div>
    )
}

export default ViewUserDetail