package api.entities.CodeInfo;

import lombok.Getter;

@Getter
public class PostRequest {
    private String cppCode;
    private long infoProblemId;
    private long studentId;
    private long teacherId;
}
