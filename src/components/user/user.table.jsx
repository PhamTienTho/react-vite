import { Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.userModal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import DeleteUserConfirm from './user.deleteConfirm';
import { AppConfigContext } from 'antd/es/app/context';

const UserTable = (props) => {

    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize, setTotal } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [userDetail, setUserDetail] = useState(null)

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(current - 1) * pageSize + index + 1}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <div>
                        <a
                            onClick={() => {
                                setIsDetailOpen(true);
                                setUserDetail(record)
                            }}>
                            {record._id}
                        </a>
                    </div>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUpdate(record)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />

                    <DeleteUserConfirm
                        id={record._id}
                        loadUser={loadUser}
                    />
                </div>
            )
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={'_id'}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                userDetail={userDetail}
                setUserDetail={setUserDetail}
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;