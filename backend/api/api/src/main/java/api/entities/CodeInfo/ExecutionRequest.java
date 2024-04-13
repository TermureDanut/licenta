package api.entities.CodeInfo;

import api.entities.InfoProblem;
import lombok.Getter;

@Getter
public class ExecutionRequest {
    private String cppCode;
    private long infoProblemId;
}
