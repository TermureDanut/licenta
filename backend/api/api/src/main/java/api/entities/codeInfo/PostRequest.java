package api.entities.codeInfo;

import lombok.Getter;

@Getter
public class PostRequest {
    private String cppCode;
    private long infoProblemId;
    private long studentId;
    private long teacherId;
}
