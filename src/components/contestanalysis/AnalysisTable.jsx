import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const AnalysisTable = ({ tableData }) => {
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    let searchInput = null;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Roll Number',
            dataIndex: 'roll',
            key: 'roll',
            ...getColumnSearchProps('roll'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Ranking',
            dataIndex: ['performance', 'ranking'],
            key: 'ranking',
            sorter: (a, b) => a.performance.ranking - b.performance.ranking,
        },
        {
            title: 'Problems Solved',
            dataIndex: ['performance', 'problemsSolved'],
            key: 'problemsSolved',
            sorter: (a, b) => a.performance.problemsSolved - b.performance.problemsSolved,
        }
    ];

    return (
        <div className='overflow-x-auto m-2'>
            <Table columns={columns} dataSource={tableData} rowKey="roll" />;
        </div>
    )
};

export default AnalysisTable;
