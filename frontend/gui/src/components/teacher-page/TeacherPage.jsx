import {useEffect, useState} from "react";
import ClassroomCard from "../classroom-card/ClassroomCard";
import SideMenu from "../side-menu/SideMenu";
import "./style.css";
import {useLocation} from "react-router-dom";

const TeacherPage = () => {
    const location = useLocation();
    const {teacherData} = location.state;
    const [classrooms, setClassrooms] = useState([]);
    const [addedClassroom, setAddedClassroom] = useState(false);

    useEffect(() => {
        const getClasses = async () => {
            const response = await fetch(
                "http://localhost:8080/api/teachers/getAllClasses/" + teacherData.id,
                {
                    method: "GET",
                }
            );
            const jsonResponse = await response.json();
            setClassrooms(jsonResponse);
            setAddedClassroom(false);
        };
        getClasses().then();
    }, [teacherData.id, addedClassroom]);

    const handleAddClassroom = () => {
        setAddedClassroom(true);
    };

    return (
        <div className="mainArea">
            <div>
                <SideMenu teacherData={teacherData} adddedClassroom={handleAddClassroom} inHomePage={true}
                          inClassroomsPage={false}/>
            </div>
            <div className="classrooms">
                <div>
                    {classrooms.map((classroom, index) => (
                        <ClassroomCard key={index} classroom={classroom}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherPage;
