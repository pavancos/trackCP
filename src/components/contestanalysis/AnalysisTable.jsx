import React, { useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const AnalysisTable = ({ tableData }) => {
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    // let searchInput = null;
    useEffect(() => {
        // console.log(tableData)
        console.log('tableData: ', tableData);
    }, [tableData]);

    // const getColumnSearchProps = (dataIndex) => ({
    //     // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //     //     <div style={{ padding: 8 }}>
    //     //         <Input
    //     //             ref={node => {
    //     //                 searchInput = node;
    //     //             }}
    //     //             placeholder={`Search ${dataIndex}`}
    //     //             value={selectedKeys[0]}
    //     //             onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //     //             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //     //             style={{ marginBottom: 8, display: 'block' }}
    //     //         />
    //     //     </div>
    //     // ),
    //     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    //     onFilter: (value, record) =>
    //         record[dataIndex]
    //             ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //             : '',
    //             onFilterDropdownOpenChange: visible => {
    //         if (visible) {
    //             setTimeout(() => searchInput.select(), 100);
    //         }
    //     },
    //     render: text =>
    //         searchedColumn === dataIndex ? (
    //             <Highlighter
    //                 highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //                 searchWords={[searchText]}
    //                 autoEscape
    //                 textToHighlight={text ? text.toString() : ''}
    //             />
    //         ) : (
    //             text
    //         ),
    // });

    // const handleSearch  (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };

    // const handleReset = clearFilters => {
    //     clearFilters();
    //     setSearchText('');
    // };

    const columns = [
        {
            title: 'Roll Number',
            dataIndex: 'roll',
            key: 'roll',
            // ...getColumnSearchProps('roll'),
            sorter: (a, b) => a.roll.localeCompare(b.roll),
            onHeaderCell: () => ({
                style: {
                    backgroundColor: '#e9edf4',
                    borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderRadius: '0px',
                }
            }),
            onCell: () => ({
                style: {
                    borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderCollapse: 'collapse',
                }
            }),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // ...getColumnSearchProps('name'),
            onHeaderCell: () => ({
                style: {
                    backgroundColor: '#e9edf4', borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    // borderLeft: '1px solid #475569',
                    // borderRight: '1px solid #475569',
                }
            }),
            onCell: () => ({
                style: {
                    borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderCollapse: 'collapse',
                }
            }),
        },
        {
            title: 'Ranking',
            dataIndex: ['performance', 'ranking'],
            key: 'ranking',
            sorter: (a, b) => a.performance.ranking - b.performance.ranking,
            onHeaderCell: () => ({
                style: {
                    backgroundColor: '#e9edf4', borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                }
            }),
            onCell: () => ({
                style: {
                    borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderCollapse: 'collapse',
                }
            }),
        },
        {
            title: 'Problems Solved',
            dataIndex: ['performance', 'problemsSolved'],
            key: 'problemsSolved',
            sorter: (a, b) => a.performance.problemsSolved - b.performance.problemsSolved,
            onHeaderCell: () => ({
                style: {
                    backgroundColor: '#e9edf4', borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    // borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderRadius: '0px',
                },
            }),
            onCell: () => ({
                style: {
                    borderTop: '1px solid #475569',
                    borderBottom: '1px solid #475569',
                    borderLeft: '1px solid #475569',
                    borderRight: '1px solid #475569',
                    borderCollapse: 'collapse',
                }
            }),
        }
    ];

    return (
        <div className='overflow-x-auto m-2'>
            {/* <Table columns={columns} dataSource={tableData} rowKey="roll" pagination={false} /> */}
            <Table
                className="table-bordered"  // Apply the class
                columns={columns}
                dataSource={tableData}
                rowKey="roll"
                pagination={false}
            />

        </div>
    )
};

export default AnalysisTable;