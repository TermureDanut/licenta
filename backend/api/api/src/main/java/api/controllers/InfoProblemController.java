package api.controllers;

import api.entities.InfoProblem;
import api.services.InfoProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/infoproblem/")
public class InfoProblemController {
    @Autowired
    private InfoProblemService infoProblemService;

    @PostMapping("new/{teacherId}")
    public InfoProblem addProblem(@PathVariable("teacherId") long teacherId, @RequestBody InfoProblem infoProblem) {
        InfoProblem infoProblem1 = infoProblemService.addProblem(teacherId, infoProblem);
        if (infoProblem1 != null) {
            return infoProblem1;
        }
        return null;
    }

    @GetMapping("all")
    public Page<InfoProblem> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return infoProblemService.getAll(page, size);
    }

    @GetMapping("filtered/category")
    public Page<InfoProblem> filterCategory(@RequestParam String category, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return infoProblemService.filterCategory(category, page, size);
    }

    @GetMapping("filtered/difficulty")
    public Page<InfoProblem> filterDifficulty(@RequestParam String difficulty, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return infoProblemService.filterDifficulty(difficulty, page, size);
    }

    @GetMapping("search/{problemId}")
    public ResponseEntity<?> getById(@PathVariable("problemId") long problemId) {
        InfoProblem problem = infoProblemService.getById(problemId);
        if (problem != null) {
            return ResponseEntity.status(HttpStatus.OK).body(problem);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
    }
}
