package api.services;

import api.entities.InfoProblemTest;
import api.repositories.InfoProblemTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoProblemTestService {
    @Autowired
    private InfoProblemTestRepository infoProblemTestRepository;

    public List<InfoProblemTest> getExample(long id) {
        return infoProblemTestRepository.findByCheckedAndInfoProblemId(true, id);
    }

    public List<InfoProblemTest> getAllTests(long id) {
        return infoProblemTestRepository.findByInfoProblemId(id);
    }
}
