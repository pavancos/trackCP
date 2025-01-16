import React, { useState, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const BatchTable = ({ data }) => {
    const searchInput = useRef(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

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
    });

    // Columns definition
    const columns = [
        {
            title: "Sno",
            key: "sno",
            render: (text, record, index) => {
                const { current, pageSize } = pagination; // Ensure pagination is accessible
                return pageSize * (current - 1) + index + 1; // Calculate serial number
            },
            fixed: "left",
            width: 60,
        },
        {
            title: "RollNo",
            dataIndex: "rollNo",
            key: "rollNo",
            ...getColumnSearchProps("rollNo"),
            fixed: "left",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
            filters: [
                { text: "2026", value: 2026 },
                { text: "2025", value: 2025 },
                { text: "2027", value: 2027 },
            ],
            onFilter: (value, record) => record.year === value,
        },
        {
            title: "Branch",
            dataIndex: "branch",
            key: "branch",
            filters: [
                { text: "CSE", value: "CSE" },
                { text: "CSMD", value: "CSMD" },
                { text: "IT", value: "IT" },
                { text: "ECE", value: "ECE" },
            ],
            onFilter: (value, record) => record.branch === value,
        },
        {
            title: "Leetcode",
            children: [
                {
                    title: "Total Ps",
                    dataIndex: ["leetcode", "TotalProblemsSolved"],
                    key: "leetcodeTotalPs",
                    sorter: (a, b) => a.leetcode.TotalProblemsSolved - b.leetcode.TotalProblemsSolved,
                },
                {
                    title: "Rating",
                    dataIndex: ["leetcode", "rating"],
                    key: "leetcodeRating",
                    sorter: (a, b) => a.leetcode.rating - b.leetcode.rating,
                },
                {
                    title: "Contests",
                    dataIndex: ["leetcode", "contests"],
                    key: "leetcodeContests",
                    sorter: (a, b) => a.leetcode.contests - b.leetcode.contests,
                },
                {
                    title: "Score",
                    dataIndex: ["leetcode", "score"],
                    key: "leetcodeScore",
                    sorter: (a, b) => a.leetcode.score - b.leetcode.score,
                },
            ],
        },
        {
            title: "Codechef",
            children: [
                {
                    title: "Total Ps",
                    dataIndex: ["codechef", "TotalProblemsSolved"],
                    key: "codechefTotalPs",
                    sorter: (a, b) => a.codechef.TotalProblemsSolved - b.codechef.TotalProblemsSolved,
                },
                {
                    title: "Rating",
                    dataIndex: ["codechef", "rating"],
                    key: "codechefRating",
                    sorter: (a, b) => a.codechef.rating - b.codechef.rating,
                },
                {
                    title: "Contests",
                    dataIndex: ["codechef", "contests"],
                    key: "codechefContests",
                    sorter: (a, b) => a.codechef.contests - b.codechef.contests,
                },
                {
                    title: "Score",
                    dataIndex: ["codechef", "score"],
                    key: "codechefScore",
                    sorter: (a, b) => a.codechef.score - b.codechef.score,
                },
            ],
        },
        {
            title: "Codeforces",
            children: [
                {
                    title: "Total Ps",
                    dataIndex: ["codeforces", "TotalProblemsSolved"],
                    key: "codeforcesTotalPs",
                    sorter: (a, b) => a.codeforces.TotalProblemsSolved - b.codeforces.TotalProblemsSolved,
                },
                {
                    title: "Rating",
                    dataIndex: ["codeforces", "rating"],
                    key: "codeforcesRating",
                    sorter: (a, b) => a.codeforces.rating - b.codeforces.rating,
                },
                {
                    title: "Contests",
                    dataIndex: ["codeforces", "contests"],
                    key: "codeforcesContests",
                    sorter: (a, b) => a.codeforces.contests - b.codeforces.contests,
                },
                {
                    title: "Score",
                    dataIndex: ["codeforces", "score"],
                    key: "codeforcesScore",
                    sorter: (a, b) => a.codeforces.score - b.codeforces.score,
                },
            ],
        },
        {
            title: "InterviewBit",
            children: [
                {
                    title: "Total Ps",
                    dataIndex: ["interviewbit", "TotalProblemsSolved"],
                    key: "interviewbitTotalPs",
                    sorter: (a, b) => a.interviewbit.TotalProblemsSolved - b.interviewbit.TotalProblemsSolved,
                },
                {
                    title: "Platform Score",
                    dataIndex: ["interviewbit", "platformScore"],
                    key: "interviewbitPlatformScore",
                    sorter: (a, b) => a.interviewbit.platformScore - b.interviewbit.platformScore,
                },
                {
                    title: "Score",
                    dataIndex: ["interviewbit", "score"],
                    key: "interviewbitScore",
                    sorter: (a, b) => a.interviewbit.score - b.interviewbit.score,
                },
            ],
        },
        {
            title: "Total Score",
            dataIndex: "totalScore",
            key: "totalScore",
            sorter: (a, b) => a.totalScore - b.totalScore,
        },
    ];

    // Handle page change event
    const handlePaginationChange = (page, pageSize) => {
        setPagination({ current: page, pageSize });
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    onChange: handlePaginationChange,
                    total: data.length,
                }}
                bordered={true}
                scroll={{
                    x: "max-content",
                }}
            />
        </div>
    );
};

export default BatchTable;
