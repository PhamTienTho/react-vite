import { Button, Form, Input, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";


const CreateBookModal = (props) => {

    const { loadBooks } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);

    const handleOnChange = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedThumbnail(null);
            setPreviewThumbnail(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedThumbnail(file);
            setPreviewThumbnail(URL.createObjectURL(file));
            event.target.value = null;
        }
    }

    const handleOnFinish = async (value) => {
        const res = await handleUploadFile(selectedThumbnail, "book");
        if (res.data) {
            const fileUploaded = res.data.fileUploaded;
            const resCreate = await createBookAPI(fileUploaded, value.title, value.author, +value.price, +value.quantity, value.category);
            if (resCreate.data) {
                await loadBooks();
                message.success("Thêm sách mới thành công");
                form.resetFields();
                setPreviewThumbnail(null);
                setSelectedThumbnail(null);
                setIsModalOpen(false);
            }
            else {
                notification.error({
                    message: "Thêm sách thất bại",
                    description: JSON.stringify(resCreate.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error",
                description: "Bạn cần upload ảnh minh họa"
            })
        }
    }

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>Table Books</div>
                <Button type="primary"
                    onClick={() => {
                        setIsModalOpen(true)
                    }}>Create Book</Button>
            </div>
            <Modal
                title="Thêm sách mới"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                    setPreviewThumbnail(null);
                    setSelectedThumbnail(null);
                }}
            >
                <Form
                    name="basic"
                    onFinish={handleOnFinish}
                    form={form}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Please input the author!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input suffix="đ" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Select
                            defaultValue=""
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>
                </Form>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span>Ảnh thumbnail:</span>
                    <div>
                        <label htmlFor="uploadFileBtn"
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "0px",
                                padding: "5px 10px",
                                background: "white",
                                borderRadius: "3px",
                                cursor: "pointer",
                                color: "#74a1f5ff",
                                border: "solid 2px #74a1f5ff"
                            }}>Upload</label>
                        <input onChange={handleOnChange} id="uploadFileBtn" type="file" hidden ></input>
                    </div>
                    {
                        previewThumbnail &&
                        <>
                            <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "solid 1px #ccc" }}>
                                <img
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={previewThumbnail}
                                />
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </>
    )
}

export default CreateBookModal;