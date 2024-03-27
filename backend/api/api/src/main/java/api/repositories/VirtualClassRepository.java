package api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import api.entities.VirtualClass;

public interface VirtualClassRepository extends JpaRepository<VirtualClass, Long> {
    List<VirtualClass> findByTeacherId(Long id);
}
