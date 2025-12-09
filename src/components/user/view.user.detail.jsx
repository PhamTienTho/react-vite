import { Button, Drawer, notification } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";



const ViewUserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, userDetail, setUserDetail, loadUser } = props

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (userDetail) {
            setId(userDetail._id);
            setFullName(userDetail.fullName);
            setEmail(userDetail.email);
            setPhone(userDetail.phone);

            setSelectedFile(null);
            setPreview(null);
        }
    }, [userDetail])

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            event.target.value = null;
        }

    }

    const handleUpdateUserAvatar = async () => {
        // step 1: uplodad file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            // step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, id, fullName, phone);
            if (resUpdateAvatar.data) {
                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật thành công"
                });
                await loadUser();
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
            }
            else {
                notification.error({
                    message: "Error upload avatar",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }

    }

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
                    <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "solid 1px #ccc" }}>
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
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
                            color: "#74a1f5ff",
                            border: "solid 2px #74a1f5ff"
                        }}
                    >Upload File</label>
                    <input type="file"
                        onChange={(event) => { handleOnChangeFile(event) }}
                        hidden id="uploadAvatarBtn"
                    />
                    {
                        preview &&
                        <>
                            <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "solid 1px #ccc" }}>
                                <img
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview}
                                />
                            </div>
                            <div>
                                <Button type="primary"
                                    onClick={() => handleUpdateUserAvatar()}
                                >Save</Button>

                            </div>
                        </>

                    }
                </div>
            </Drawer>

        </div>
    )
}

export default ViewUserDetail