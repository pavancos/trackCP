import React from 'react';
import { Table, Button, Space } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../store/authContext';
import DeleteModal from '../batchconfig/modals/DeleteModal'
import { useNavigate } from "react-router-dom";

const ViewConfigTable = ({ views, handleViewDelete }) => {
    const { authState } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    const columns = [
        {
            title: 'View Name',
            dataIndex: 'viewName',
            key: 'viewName',
            render: (text) => (
                <div style={{ padding: '8px 12px' }}>{text}</div>
            ),

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                
                <Space size="middle">
                    <Button
                        type="default"
                        onClick={
                            () => {
                                navigate(`/super/editview/${record.viewName}`);
                            }
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        type="default"
                        onClick={
                            () => {
                                navigate(`/view/${record.viewName}`);
                            }
                        }
                    >
                        View
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={() => {
                            setName(record.viewName);
                            setIsDelete(true);
                            console.log("Deleted");
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = views.map((viewName, index) => ({
        key: index,
        viewName: viewName
    }));


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
            {
                isDelete && 
                <DeleteModal 
                    setIsDelete={setIsDelete}
                    isView={true}
                    viewName={name}
                    handleDelete={handleViewDelete}
                />
            }
        </>
    );
};

export default ViewConfigTable;