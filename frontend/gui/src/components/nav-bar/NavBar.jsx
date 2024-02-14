import "./style.css";
const NavBar = (props) => {
    const teacherName = props.name;
    return (
        <div className="header">
            <div className="text">
                <p>Hello {teacherName}</p>
            </div>
        </div>
    );
}

export default NavBar;