package api.services;

import api.entities.InfoProblem;
import api.entities.Teacher;
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

    public InfoProblem addProblem(long teacherId, InfoProblem infoProblem) {
        Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
        if (teacher != null) {
            infoProblem.setTeacher(teacher);
            teacher.addInfoProblem(infoProblem);
            teacherRepository.save(teacher);
            infoProblemsRepository.save(infoProblem);
            return infoProblem;
        }
        return null;
    }

    public Page<InfoProblem> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return infoProblemsRepository.findAll(pageable);
    }

    public Page<InfoProblem> filter(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return infoProblemsRepository.findByCategory(category, pageable);
    }
}
