package api.controllers;

import api.entities.InfoProblem;
import api.entities.InfoProblemRequest;
import api.entities.InfoProblemTest;
import api.services.InfoProblemService;
import api.services.InfoProblemTestService;
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
    @Autowired
    private InfoProblemTestService infoProblemTestService;

    @PostMapping("new/{teacherId}")
    public ResponseEntity<InfoProblem> addProblem(@PathVariable("teacherId") long teacherId, @RequestBody InfoProblemRequest infoProblemRequest) {
        InfoProblem infoProblem = infoProblemService.addProblem(teacherId, infoProblemRequest);
        if (infoProblem != null) {
            return new ResponseEntity<>(infoProblem, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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

    @GetMapping("search")
    public ResponseEntity<?> search(@RequestParam String search, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(infoProblemService.search(search, page, size));
    }

    @GetMapping("getexamples/{id}")
    public ResponseEntity<List<InfoProblemTest>> getExamples(@PathVariable("id") long id) {
        return new ResponseEntity<>(infoProblemTestService.getExample(id), HttpStatus.OK);
    }

    @GetMapping("gettests/{id}")
    public ResponseEntity<List<InfoProblemTest>> getAllTests(@PathVariable("id") long id) {
        return new ResponseEntity<>(infoProblemTestService.getAllTests(id), HttpStatus.OK);
    }
}
