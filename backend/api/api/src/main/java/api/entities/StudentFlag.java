package api.entities;

import lombok.Data;

@Data
public class StudentFlag {
    private Student student;
    private int studentFlag;
    public StudentFlag(Student student){
        this.student = student;
        this.studentFlag = 1;
    }
}
