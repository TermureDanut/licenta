package api.entities.CodeInfo;

import lombok.Getter;

@Getter
public class ExecutionRequest {
    private String cppCode;
    private long infoProblemId;
}
