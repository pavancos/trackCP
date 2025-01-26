import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import PieChartComponent from "../Charts/StudentCharts/ProblemsPie";
import Loading from "../Loading";
import StudentTable from "./StudentTable";
import { combineContests } from "./StudentUtil/chartUtils";
import { set } from "react-ga";
const Student = () => {
    let { rollNo } = useParams();
    const [studentInfo, setStudentInfo] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState(null);
    const [ratingHistory, setRatinHistory] = useState(null);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                rollNo = rollNo.toUpperCase();
                const response = await fetch(
                    `https://v2contestinfo.onrender.com/v2/student/?rollNo=${rollNo}`
                );
                if (!response.ok) {
                    throw new Error("Student Not Found");
                }
                const data = await response.json();
                setStudentInfo(data);
                setRatinHistory(combineContests(data));

            } catch (err) {
                setError(err.message);
            } finally {
                setIsFetched(true);
            }
        };

        fetchStudentInfo();
    }, [rollNo]);

    const problemsData=useMemo(() => {
        if (!studentInfo) return;
        const data=[
            {
                name: "LeetCode",
                value: studentInfo.leetcode.TotalProblemsSolved,
                score: studentInfo.leetcode.score,
                fill: "#d6a540"
            },
            {
                name: "Codeforces",
                value: studentInfo.codeforces.TotalProblemsSolved,
                score: studentInfo.codeforces.score,
                fill: "#a52f2c"

            },
            {
                name: "CodeChef",
                value: studentInfo.codechef.TotalProblemsSolved,
                score: studentInfo.codechef.score,
                fill: "#a7673a"

            },
            {
                name: "InterviewBit",
                value: studentInfo.interviewbit.TotalProblemsSolved,
                score: studentInfo.interviewbit.score,
                fill: "#4e949e"
            }
        ]
        return data.sort((a, b) => b.value - a.value);
    }, [studentInfo])

    if (!isFetched) {
        return (
            <div className="w-full flex flex-row justify-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Error: {error}</h1>
            </div>
        );
    }

    return (
        <div className={
            `flex flex-col space-y-8 p-6`
        }
        >
            <div
                className={
                    `flex flex-col md:flex-row justify-between items-center
                    border-2 rounded-xl bg-[#07070721] shadow-md
                    `
                }
            >
                <div 
                    className={
                        ` rounded-md px-2 py-4 m-4  `
                    }
                >

                    <h1 className="text-2xl ">{studentInfo.name}</h1>
                    <h2 className="text-xl font-bold" >{studentInfo.rollNo}</h2>
                    <h3>Branch: {studentInfo.branch}</h3>
                    <h2>Passout Year: {studentInfo.year}</h2>
                    <h2>Codechef :   
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://www.codechef.com/users/${studentInfo.codechef.username}`} target="_blank">{studentInfo.codechef.username}</a>
                    </h2>
                    <h2>Leetcode : 
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://leetcode.com/u/${studentInfo.leetcode.username}`} target="_blank">{studentInfo.leetcode.username}</a>
                    </h2>
                    <h2>Codeforces : 
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://codeforces.com/profile/${studentInfo.codeforces.username}`} target="_blank">{studentInfo.codeforces.username}</a>
                    </h2>
                    <h2>InterviewBit : 
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://www.interviewbit.com/profile/${studentInfo.interviewbit.username}`} target="_blank">{studentInfo.interviewbit.username}</a>
                    </h2>
                    <h2>Hackerrank : 
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://www.hackerrank.com/profile/${studentInfo.hackerrank}`} target="_blank">{studentInfo.hackerrank}</a>
                    </h2>
                    <h2>Spoj : 
                        <a className="ml-1 text-blue-600 hover:text-blue-800 hover:underline" href={`https://www.spoj.com/status/${studentInfo.spoj}`} target="_blank">{studentInfo.spoj}</a>
                    </h2>
                </div>
                <div className="w-[500px] h-[300px] rounded-xl mr-3 my-3 ">
                    {problemsData && <PieChartComponent data={problemsData} />}
                </div>

            </div>
            <StudentTable data={ratingHistory}></StudentTable>

        </div>
    );
};

export default Student;
