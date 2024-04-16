package api.services;

import api.entities.ProblemUpload;
import api.entities.Student;
import api.entities.Teacher;
import api.repositories.ProblemUploadRepository;
import api.repositories.StudentRepository;
import api.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemUploadService {
    @Autowired
    private ProblemUploadRepository problemUploadRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;

    public ProblemUpload addProblemUpload(ProblemUpload problemUpload, long studentId, long teacherId) {
        if (problemUpload.isStudentFlag()) {
            Student student = studentRepository.findById(studentId).orElse(null);
            if (student != null) {
                problemUpload.setStudent(student);
                Teacher dummyTeacher = teacherRepository.findAll().get(0);
                problemUpload.setTeacher(dummyTeacher);
                problemUploadRepository.save(problemUpload);
                return problemUpload;
            }
            return null;
        }

        if (problemUpload.isTeacherFlag()) {
            Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
            if (teacher != null) {
                Student dummyStudent = studentRepository.findAll().get(0);
                problemUpload.setStudent(dummyStudent);
                problemUpload.setTeacher(teacher);
                problemUploadRepository.save(problemUpload);
                return problemUpload;
            }
            return null;
        }
        return null;
    }

    public List<ProblemUpload> getUploads(long studentId, long teacherId, long problemId) {
        if (studentId != -1) {
            Student student = studentRepository.findById(studentId).orElse(null);
            if (student != null) {
                return problemUploadRepository.getAllByStudentIdAndInfoProblemId(studentId, problemId);
            }
            return null;
        }

        if (teacherId != -1) {
            Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
            if (teacher != null) {
                return problemUploadRepository.getAllByTeacherIdAndInfoProblemId(teacherId, problemId);
            }
            return null;
        }
        return null;
    }
}


