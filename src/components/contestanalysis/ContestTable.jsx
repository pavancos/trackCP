import React, { useState,useEffect, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import { getYearsBranches } from "../batchReport/BatchUtil";

const DeltaComponent = ({ value }) => {
    const style = {
        color: value > 0 ? "green" : value < 0 ? "red" : "black",
        fontWeight: "bold",
    };

    return <span style={style}>{value}</span>;
};

const ContestTable = ({ contestData }) => {
    const searchInput = useRef(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [yearsBranches, setYearsBranches] = useState({ years: [], branches: [] });


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

    useEffect(()=>{
        async function getAvailableBatches(){
            let yearBranchDetails = await  getYearsBranches()
            let years = yearBranchDetails.years.map(year => ({ text: year, value: year }))
            let branches = yearBranchDetails.branches.map(branch => ({ text: branch, value: branch }))
            setYearsBranches({years, branches})
        }
        getAvailableBatches();        
    },[])

    useEffect(()=>{
        console.log(yearsBranches)
    },[yearsBranches])

    let columns = [
        {
            title: "Sno",
            key: "sno",
            render: (text, record, index) => {
                const { current, pageSize } = pagination;
                return pageSize * (current - 1) + index + 1;
            },
            fixed: "left",
            width: 60,
        },
        {
            title: "Roll No",
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
            filters: yearsBranches.years,
            onFilter: (value, record) => record.year === value,
        },
        {
            title: "Branch",
            dataIndex: "branch",
            key: "branch",
            filters: yearsBranches.branches,
            onFilter: (value, record) => record.branch === value,
        },
        {
            title: "Problems Solved",
            dataIndex: ["performance", "problemsSolved"],
            key: "problemsSolved",
            sorter: (a, b) => a.performance.problemsSolved - b.performance.problemsSolved,
        },
        {
            title: "Rating",
            dataIndex: ["performance", "rating"],
            key: "rating",
            sorter: (a, b) => a.performance.rating - b.performance.rating,
        },
        {
            title: "Rank",
            dataIndex: ["performance", "rank"],
            key: "rank",
            sorter: (a, b) => a.performance.rank - b.performance.rank,
        },
        {
            title: "Delta",
            dataIndex: ["performance", "delta"],
            key: "delta",
            sorter: (a, b) => a.performance.delta - b.performance.delta,
            render : (text, record) => <DeltaComponent value={record.performance.delta} />
        }
    ];

    if (contestData.contest.platform === "codechef") {
        columns.push({
            title: "Division",
            dataIndex: ["performance", "div"],
            key: "division",
        })
    }
    const handlePaginationChange = (page, pageSize) => {
        setPagination({ current: page, pageSize });
    };

    const data = contestData.students.map((student) => ({
        ...student,
        platform: contestData.contest.platform,
        contestName: contestData.contest.contestName,
        date: contestData.contest.date,
        link: contestData.contest.link,
        key: student.rollNo,
    }));

    return (
        <div className="px-1" style={{ overflowX: "auto" }}>
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

export default ContestTable;
