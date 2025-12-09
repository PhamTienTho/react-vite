import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import BookForm from "./book.form";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";

const BookTable = (props) => {

    const { dataBooks, loadBooks } = props;

    const dataSource = dataBooks;

    const [bookDetail, setBookDetail] = useState(null);
    const [isBookDetailOpen, setIsBookDetailOpen] = useState(false);

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <div>
                        <a onClick={() => {
                            setIsBookDetailOpen(true);
                            setBookDetail(record);
                        }}>
                            {record._id}
                        </a>
                    </div>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record) => {
                if(text ) return new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }).format(record.price)
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity'
        },
        {
            title: 'Tác giả',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "30px" }}>
                        <EditOutlined />
                        <DeleteOutlined />
                    </div>
                )
            }
        },
    ];

    <Table dataSource={dataSource} columns={columns} />;

    return (
        <div>
            <BookForm
                loadBooks={loadBooks}
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'_id'}
            />
            <ViewBookDetail
                isBookDetailOpen={isBookDetailOpen}
                setIsBookDetailOpen={setIsBookDetailOpen}
                bookDetail={bookDetail}
            />
        </div>
    )
}

export default BookTable;