import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";

const BookTable = (props) => {

    const {dataBooks} = props;

    const dataSource = dataBooks;

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
        },
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price'
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
                return(
                    <div style={{display: "flex", gap: "30px"}}>
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
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default BookTable;