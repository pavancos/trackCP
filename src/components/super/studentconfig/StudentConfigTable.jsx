import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { deleteStudent } from "../modals/modalHandlers";
import { useAuth } from "../../../store/authContext";
import toast from "react-hot-toast";
const StudentConfigTable = ({ students,setStudents, onEdit,year,branch }) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const {authState} = useAuth();

    let searchInput = null;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: "S.No",
            dataIndex: "sno",
            key: "sno",
            render: (_, __, index) => index + 1,
            width: 60,
            fixed: "left",
        },
        {
            title: "Roll No",
            dataIndex: "rollNo",
            key: "rollNo",
            ...getColumnSearchProps("rollNo"),
            width: 120,
            fixed: "left",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 150,
        },
        {
            title: "LeetCode",
            dataIndex: "leetcode",
            key: "leetcode",
            width: 150,
        },
        {
            title: "CodeChef",
            dataIndex: "codechef",
            key: "codechef",
            width: 150,
        },
        {
            title: "CodeForces",
            dataIndex: "codeforces",
            key: "codeforces",
            width: 150,
        },
        {
            title: "InterviewBit",
            dataIndex: "interviewbit",
            key: "interviewbit",
            width: 150,
        },
        {
            title: "HackerRank",
            dataIndex: "hackerrank",
            key: "hackerrank",
            width: 150,
        },
        {
            title: "Spoj",
            dataIndex: "spoj",
            key: "spoj",
            width: 150,
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div className="flex space-x-2">
                    <Button type="default" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={ async() => {
                            // console.log("Delete row:", record)
                            const res = await deleteStudent(record.rollNo,year,branch,authState.token);
                            if(res.error){
                                toast.error(res.message);
                            }else{
                                toast.success(res.message);
                                setStudents(students.filter(student => student.rollNo !== record.rollNo));
                            }
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
            width: 100,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={students.map((student, index) => ({
                key: index,
                sno: index + 1,
                rollNo: student.rollNo,
                name: student.name,
                leetcode: student.leetcode.username,
                codechef: student.codechef.username,
                codeforces: student.codeforces.username,
                interviewbit: student.interviewbit.username,
                hackerrank: student.hackerrank,
                spoj: student.spoj,
            }))}
            pagination={{
                pageSize: pageSize,
                pageSizeOptions: ["20", "50", "100", "200", "300"],
                showSizeChanger: true,
                onShowSizeChange: (_, size) => setPageSize(size),
            }}
            scroll={{ x: "max-content" }}
            style={{ width: "100%" }}
        />
    );
};

export default StudentConfigTable;