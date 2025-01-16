import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PieChartComponent from "../Charts/StudentCharts/ProblemsPie";
import Loading from "../Loading";

const Student = () => {
    let { rollNo } = useParams();
    const [studentInfo, setStudentInfo] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState(null);
    const [problemsData, setProblemsData] = useState(null);

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
            } catch (err) {
                setError(err.message);
            } finally {
                setIsFetched(true);
            }
        };

        fetchStudentInfo();
    }, [rollNo]);

    useEffect(() => {
        if (!studentInfo) return;
        setProblemsData([
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
        ])
        setProblemsData((prevData) => {
            return prevData.sort((a, b) => b.value - a.value);
        });
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
        <div>
            <h1>Name: {studentInfo.name}</h1>
            <h2>Roll No: {studentInfo.rollNo}</h2>
            <h3>Branch: {studentInfo.branch}</h3>
            <h2>Passout Year: {studentInfo.year}</h2>
            <div className="w-[500px] h-[500px] *:outline-none">
                {problemsData && <PieChartComponent data={problemsData} />}
            </div>
        </div>
    );
};

export default Student;
