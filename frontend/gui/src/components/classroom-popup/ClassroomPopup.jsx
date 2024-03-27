import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ClassroomPopup = () => {
  return (
    <DialogContent className="dialogdyn">
      <DialogContentText className="dialog-text">
        Waiting for another player{dots}
      </DialogContentText>

      <DialogContentText className="dialog-text">
        Meanwhile enjoy this picture of the GOAT
      </DialogContentText>

      <img src={GOAT} alt="Descriptive Text" className="dialog-image" />
    </DialogContent>
  );
};

export default ClassroomPopup;
