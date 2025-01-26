import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../store/authContext";
import { getStudents } from "../handlers";
import Loading from "../../Loading";
import StudentConfigTable from "./StudentConfigTable";
import { useNavigate } from "react-router-dom";
import AddStudent from "../modals/AddStudent";

const StudentConfig = () => {
    const { year, branch } = useParams();
    const { authState } = useAuth();
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const [studentToEdit, setStudentToEdit] = useState(null); // State to hold the student data to edit
    const [isEdit, setIsEdit] = useState(false); // State to track whether it’s add or edit

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
        setStudentToEdit(null); // Ensure no student data is passed when adding new student
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

    return (
        <div>
            <div className="flex justify-between items-center px-3">
                <h1 className="text-2xl font-semibold">
                    Students Config {year}-{branch}
                </h1>
                <div>
                    <button className="btnSubmit mb-2 w-min" onClick={handleAddStudent}>
                        Add New Student
                    </button>
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