import React from 'react';
import { Table, Button, Space } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../store/authContext';
import DeleteModal from './modals/DeleteModal'
const BatchConfigTable = ({batches}) => {
  const {authState} = useAuth();
  const [isDelete, setIsDelete] = useState(false);

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
            onClick={() => console.log('Edit clicked for row:', record)}
          >
            Edit
          </Button>
          <Button
            type="default"
            danger
            onClick={() => setIsDelete(true) }
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
    />
    {
      isDelete && <DeleteModal setIsDelete={setIsDelete} year={year} branch={branch} />
    }
    </>
  );
};

export default BatchConfigTable;