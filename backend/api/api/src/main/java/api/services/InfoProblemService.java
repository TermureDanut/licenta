package api.services;

import api.entities.InfoProblem;
import api.entities.InfoProblemRequest;
import api.entities.InfoProblemTest;
import api.entities.Teacher;
import api.repositories.InfoProblemTestRepository;
import api.repositories.InfoProblemsRepository;
import api.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoProblemService {
    @Autowired
    private InfoProblemsRepository infoProblemsRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private InfoProblemTestRepository infoProblemTestRepository;

    public InfoProblem addProblem(long teacherId, InfoProblemRequest infoProblemRequest) {
        Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
        if (teacher != null) {
            InfoProblem newInfoProblem = new InfoProblem();
            InfoProblem infoProblem = infoProblemRequest.getInfoProblem();
            newInfoProblem.setName(infoProblem.getName());
            newInfoProblem.setCategory(infoProblem.getCategory());
            newInfoProblem.setDifOption(infoProblem.getDifOption());
            newInfoProblem.setPbRequirement(infoProblem.getPbRequirement());
            newInfoProblem.setNrOfExamples(infoProblem.getNrOfExamples());
            newInfoProblem.setTeacher(teacher);
            infoProblemsRepository.save(newInfoProblem);
            List<InfoProblemTest> infoProblemTests = infoProblemRequest.getInfoProblemTests();
            for (InfoProblemTest infoProblemTest : infoProblemTests) {
                infoProblemTest.setInfoProblem(newInfoProblem);
                infoProblemTestRepository.save(infoProblemTest);
            }

            return newInfoProblem;
        }
        return null;
    }

    public Page<InfoProblem> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return infoProblemsRepository.findAll(pageable);
    }

    public Page<InfoProblem> filterCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return infoProblemsRepository.findByCategory(category, pageable);
    }

    public Page<InfoProblem> filterDifficulty(String difficulty, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return infoProblemsRepository.findByDifOption(difficulty, pageable);
    }

    public InfoProblem getById(long id) {
        return infoProblemsRepository.findById(id).orElse(null);
    }
}
