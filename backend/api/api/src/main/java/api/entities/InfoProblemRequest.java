package api.entities;

import lombok.Getter;

import java.util.List;

@Getter
public class InfoProblemRequest {
    private InfoProblem infoProblem;
    private List<InfoProblemTest> infoProblemTests;
}
