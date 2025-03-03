import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../store/authContext";
import { getStudents } from "../handlers";
import Loading from "../../Loading";
import StudentConfigTable from "./StudentConfigTable";
import { useNavigate } from "react-router-dom";
import AddStudent from "../modals/AddStudent";
import usernamesToXlsx from "../../../utils/UsernamesXlsx";

const StudentConfig = () => {
    const { year, branch } = useParams();
    const { authState } = useAuth();
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (authState.isAuthenticated) {
            getStudents(year, branch, authState.token)
                .then((data) => {
                    setStudents(data.students);
                })
                .finally(() => setIsLoading(false));
        }
    }, [year, branch, authState]);

    if (isLoading) {
        return (
            <div className="w-screen h-[calc(100vh-80px)] flex justify-center items-center">
                <Loading />
            </div>
        );
    }
    const handleAddStudent = () => {
        setIsEdit(false);
        setStudentToEdit(null);
        setIsModalVisible(true);
    };

    const handleEditStudent = (student) => {
        setIsEdit(true);
        setStudentToEdit(student);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setStudentToEdit(null);
    };
    const handleAddStudentJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    setStudents([...students, ...data]);
                } else {
                    toast.error("Invalid JSON format. Expected an array.");
                }
            } catch (error) {
                toast.error("Error parsing JSON: " + error.message);
            }
        };
        reader.readAsText(file);
    };


    return (
        <div>
            <div className="flex flex-wrap gap-2 justify-between items-center px-3 my-2">
                <h1 className="text-2xl font-semibold">
                    Students Config {year}-{branch}
                </h1>
                <div className="flex flex-wrap gap-2">
                    <button className="btnNormal" onClick={handleAddStudent}>
                        Add New Student
                    </button>
                    <label className="btnNormal">
                        Add using JSON
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleAddStudentJSON}
                            className="hidden"
                        />
                    </label>
                    <button onClick={() => usernamesToXlsx(students, year, branch)} className="btnNormal">Download Xlsx</button>
                </div>
            </div>
            <StudentConfigTable students={students} setStudents={setStudents} onEdit={handleEditStudent} year={year} branch={branch} />
            {isModalVisible && (
                <AddStudent
                    studentData={studentToEdit}
                    isEdit={isEdit}
                    onDone={handleCloseModal}
                    year={year}
                    branch={branch}
                    setStudents={setStudents}
                    students={students}
                />
            )}
        </div>
    );
};

export default StudentConfig;