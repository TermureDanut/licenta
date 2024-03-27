package api.controllers;

import api.entities.InfoProblem;
import api.services.InfoProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("filtered")
    public Page<InfoProblem> filter(@RequestParam String category, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        return infoProblemService.filter(category, page, size);
    }
}
