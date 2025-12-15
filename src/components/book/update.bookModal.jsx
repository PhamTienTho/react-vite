import { Form, Input, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    const [form] = Form.useForm();
    const { isBookUpdateOpen, setIsBookUpdateOpen, dataUpdate, loadBooks } = props;

    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                title: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            });
            setPreviewThumbnail(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

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

        if (!selectedThumbnail && !previewThumbnail) {
            notification.error({
                message: "Cập nhật thất bại",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        let newThumbnail = "";
        if (!selectedThumbnail && previewThumbnail) {
            newThumbnail = dataUpdate.thumbnail;
        }
        else {
            const resUpload = await handleUploadFile(selectedThumbnail, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }

        const resUpdate = await updateBookAPI(value.id, newThumbnail, value.title, value.author, +value.price, +value.quantity, value.category);
        if (resUpdate.data) {
            // await loadBooks();
            message.success("Cập nhật sách thành công");
            setPreviewThumbnail(null);
            setSelectedThumbnail(null);
            setIsBookUpdateOpen(false);
            loadBooks();
        }
        else {
            notification.error({
                message: "Thêm sách thất bại",
                description: JSON.stringify(resUpdate.message)
            })
        }
    }
    return (
        <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isBookUpdateOpen}
            onOk={() => form.submit()}
            onCancel={
                () => setIsBookUpdateOpen(false)
            }
        >

            <Form
                name="Cập nhật thông tin sách"
                onFinish={handleOnFinish}
                form={form}
            >
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>
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
                    previewThumbnail
                    &&
                    <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "solid 1px #ccc" }}>
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={previewThumbnail}
                        />
                    </div>
                }
            </div>

        </Modal>
    )
}

export default UpdateBookModal;