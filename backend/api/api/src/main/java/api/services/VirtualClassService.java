package api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.entities.VirtualClass;
import api.repositories.VirtualClassRepository;

@Service
public class VirtualClassService {
    @Autowired
    private VirtualClassRepository virtualClassRepository;

    public VirtualClass addVirtualClass(VirtualClass virtualClass) {
        virtualClassRepository.save(virtualClass);
        return virtualClass;
    }

    public List<VirtualClass> getVirtualClassesByTeacher(Long id) {
        return virtualClassRepository.findByTeacherId(id);
    }
}
