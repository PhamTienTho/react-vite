import { DeleteOutlined } from "@ant-design/icons";
import { notification, Popconfirm } from "antd";
import { deleteUserAPI } from "../../services/api.service";


const DeleteUserConfirm = (props) => {

    const { id, loadUser } = props;

    const confirmDelete = async () => {
        const res = await deleteUserAPI(id);
        await loadUser();
        if(res.data){
            notification.success({
            message: "Xóa người dùng",
            description: "Đã xóa người dùng thành công"
        })
        }
        else {
            notification.error({
                message: "Xóa người dùng",
            description: "Xóa người dùng thất bại"
            })
        }
    };
    const cancelDelete = () => {
        // messageApi.error('Click on No');
    };

    return (
        <>
            <Popconfirm
                title="Xóa người dùng"
                description="Bạn có chắc chắn muốn xóa người dùng này?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
        </>
    );
}

export default DeleteUserConfirm;