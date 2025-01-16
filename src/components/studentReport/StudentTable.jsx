import React, { useState, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const StudentTable = ({data}) => {
    const searchInput = useRef(null);

    // Function to create search filter
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });

    // Table columns
    const columns = [
        {
            title: "Contest Name",
            dataIndex: "contestName",
            key: "contestName",
            ...getColumnSearchProps("contestName"),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => {
                const [dayA, monthA, yearA] = a.date.split("-").map(Number);
                const [dayB, monthB, yearB] = b.date.split("-").map(Number);
                const dateA = new Date(`20${yearA}`, monthA - 1, dayA);
                const dateB = new Date(`20${yearB}`, monthB - 1, dayB);
        
                return dateA - dateB; // For ascending order
            },
            sortDirections: ["ascend", "descend"],
        },        
        {
            title: "Platform",
            dataIndex: "platform",
            key: "platform",
            filters: [
                { text: "Leetcode", value: "Leetcode" },
                { text: "Codeforces", value: "Codeforces" },
                { text: "Codechef", value: "Codechef" },
            ],
            onFilter: (value, record) => record.platform === value,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
            sorter: (a, b) => a.rank - b.rank,
        },
        {
            title: "Problems Solved",
            dataIndex: "problemsSolved",
            key: "problemsSolved",
            sorter: (a, b) => a.problemsSolved - b.problemsSolved,
        },
    ];

    return <Table columns={columns} dataSource={data} scroll={{ x: true }}  />;
}
export default StudentTable