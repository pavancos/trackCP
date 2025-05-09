import React from 'react';
import { Table, Button, Space } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../store/authContext';
import DeleteModal from './modals/DeleteModal'
import { useNavigate } from "react-router-dom";
import { refreshBatch } from './batchConfigHandler';
import { toast } from 'react-hot-toast';

const BatchConfigTable = ({ batches, handleDelete }) => {

    
    const { authState } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const [year, setYear] = useState(null);
    const [branch, setBranch] = useState(null);
    const navigate = useNavigate();
    const handleRefresh = async ({currYear,currBranch})=>{
        try {
            const response = await refreshBatch(currYear,currBranch, authState.token);
            console.log('currBranch: ', currBranch);
            console.log('currYear: ', currYear);
            if (response.error) {
                toast.error(response.message || 'Batch Refresh Failed');
            } else {
                toast.success(response.message || 'Refresh Started for ' + currBranch + ' ' + currYear);
            }
        } catch (error) {
            console.error('Error during full refresh:', error);
            toast.error('An error occurred during full refresh.');
        }
    }
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
                    <Button
                        type="default"
                        danger
                        onClick={() => {
                            handleRefresh({ currYear: record.year, currBranch: record.branch });                            
                        }}
                    >
                        Refresh
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
                scroll={{ x: 'max-content' }}
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