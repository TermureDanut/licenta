package api.entities;

import lombok.Data;

@Data
public class TeacherFlag {
    private Teacher teacher;
    private int teacherFlag;
    public TeacherFlag(Teacher teacher){
        this.teacher = teacher;
        this.teacherFlag = 1;
    }
}
