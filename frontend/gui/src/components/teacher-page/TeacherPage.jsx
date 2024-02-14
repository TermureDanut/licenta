import {useLocation} from "react-router-dom";
import NavBar from "../nav-bar/NavBar";

const TeacherPage = () => {
    const location = useLocation();
    const teacherName = location.state.teacher;

    return (
        <>
            <NavBar name = {teacherName}/>
            <div>
                hello
            </div>
        </>
    );
}

export default TeacherPage;