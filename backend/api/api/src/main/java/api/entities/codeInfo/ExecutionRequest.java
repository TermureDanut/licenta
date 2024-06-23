package api.entities.codeInfo;

import lombok.Getter;

@Getter
public class ExecutionRequest {
    private String cppCode;
    private long infoProblemId;
}
