import "../../style.css";
import {useEffect, useState} from "react";
import ClassroomCard from "../classroom-card/ClassroomCard";
import SideMenu from "../side-menu/SideMenu";
import config from "../../config";

const MainPage = () => {
    // user data from storage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const user = storedData.user;
    const token = storedData.accessToken;

    const [classrooms, setClassrooms] = useState([]);
    const [addedClassroom, setAddedClassroom] = useState(false);

    useEffect(() => {
        const getClasses = async () => {
            const response = await fetch(
                `${config.API_BASE_URL}teachers/getAllClasses/${user.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );
            const jsonResponse = await response.json();
            setClassrooms(jsonResponse);
            setAddedClassroom(false);
        };
        getClasses().then();
    }, [user.id, addedClassroom]);

    const handleAddClassroom = () => {
        setAddedClassroom(true);
    };

    return (
        <div className="mainArea">
            <div>
                <SideMenu teacherData={user} adddedClassroom={handleAddClassroom} inHomePage={true}
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

export default MainPage;
