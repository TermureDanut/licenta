import "./style.css";
import {useLocation} from "react-router-dom";
import SideMenu from "../side-menu/SideMenu";

const ClassroomPage = () => {
    const location = useLocation();
    const {classroom} = location.state;
    const teacherData = classroom.teacher;

    return (
        <div className="mainArea">
            <div>
                <SideMenu teacherData={teacherData}
                          adddedClassroom={false}
                          inHomePage={true}
                          inClassroomsPage={true}
                          classroom={classroom}/>
            </div>
            <div className="classroomArea">
                <div className="classroomName">
                    <p className="classroomNameStyle">{classroom.name}</p>
                </div>
                <div className="postDiv">
                    <textarea className="postCard"/>
                    <div>
                        <button className="button">cancel</button>
                        <button className="button">post</button>
                    </div>
                </div>
                <div className="postLists">

                </div>
            </div>
        </div>
    );
};

export default ClassroomPage;
