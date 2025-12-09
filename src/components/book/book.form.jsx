import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {

    const {loadBooks} = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState("")
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);

    const handleCancel = () => {
        clearAndClose();
    }

    const clearAndClose = () => {
        setIsModalOpen(false);
        setTitle("");
        setAuthor("");
        setPrice(null);
        setQuantity(null);
        setCategory("");

        setSelectedThumbnailFile(null);
        setPreviewThumbnail(null);
    }

    const handleOnChangeThumbnail = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedThumbnailFile(null);
            setPreviewThumbnail(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedThumbnailFile(file);
            setPreviewThumbnail(URL.createObjectURL(file))
            event.target.value=null;
        }
    }

    const handleCreateBook = async () => {
        const res = await handleUploadFile(selectedThumbnailFile, "book");
        if(res.data) {
            const fileUploaded = res.data.fileUploaded;
            const resCreate = await createBookAPI(fileUploaded, title, author, +price, +quantity, category);
            if(resCreate.data) {
                await loadBooks();
                message.success("Thêm sách mới thành công");
                clearAndClose();

            }
            else {
                notification.error({
                    message: "Create book error",
                    description: JSON.stringify(resCreate.message)
                })
            }
        }
        else{
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
                title="Create Books"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => { handleCreateBook() }}
                onCancel={() => {
                    handleCancel();
                }}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => {
                                setAuthor(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <span>Giá tiền</span>
                        <Input
                            value={price}
                            onChange={(event) => {
                                setPrice(event.target.value)
                            }}
                            suffix="đ"
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(event.target.value)
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Thể loại</span>
                        <Select
                            value={category}
                            onChange={(value) => {
                                setCategory(value)
                            }}
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
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <span>Ảnh thumbnail</span>
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
                            <input hidden id="uploadFileBtn" type="file"
                                onChange={(event) => { handleOnChangeThumbnail(event) }} ></input>
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
                </div>
            </Modal >
        </>
    )
}

export default BookForm;