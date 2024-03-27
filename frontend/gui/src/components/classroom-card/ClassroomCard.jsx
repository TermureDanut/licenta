import "./style.css";

const ClassroomCard = ({ classroom }) => {
  return (
    <div className="classroom-card">
      <p style={{ fontSize: "20px", color: "white", }}>{classroom.name}</p>
      <p style={{ fontSize: "20px", color: "white" }}>{classroom.teacher.firstName}</p>
      <button style={{ fontSize: "20px", height: "40px", width: "80px" }}>
        Intra
      </button>
    </div>
  );
};

export default ClassroomCard;
