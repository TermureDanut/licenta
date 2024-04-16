package api.entities;

import lombok.Getter;

@Getter
public class ProblemUploadRequest {
    private long teacherId;
    private long studentId;
    private long problemId;
}
