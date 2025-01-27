import React from 'react';
import { Table, Button, Space } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../store/authContext';
import DeleteModal from './modals/DeleteModal'
import { useNavigate } from "react-router-dom";

const BatchConfigTable = ({ batches, handleDelete }) => {
    const { authState } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const [year, setYear] = useState(null);
    const [branch, setBranch] = useState(null);
    const navigate = useNavigate();
    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Number of Students',
            dataIndex: 'nOfStudents',
            key: 'nOfStudents',
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
                                // console.log('Edit clicked for row:', record);
                                navigate(`/super/edit/${record.year}/${record.branch}`);
                            }
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        type="default"
                        onClick={
                            () => {
                                navigate(`/batch/${record.year}/${record.branch}`);
                            }
                        }
                    >
                        View
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={() => {
                            setYear(record.year);
                            setBranch(record.branch);
                            setIsDelete(true);
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={batches.map((item, index) => ({ ...item, key: item.year + item.branch || index }))}
                pagination={false}
                scroll={{ y: 240 }}
            />
            {
                isDelete && 
                <DeleteModal 
                    setIsDelete={setIsDelete}
                    year={year}
                    branch={branch}
                    handleDelete={handleDelete}
                />
            }
        </>
    );
};

export default BatchConfigTable;