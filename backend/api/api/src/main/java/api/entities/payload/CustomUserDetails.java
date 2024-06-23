package api.entities.payload;

import api.entities.Student;
import api.entities.Teacher;
import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private boolean isTeacher;
    private boolean isStudent;
    @Getter
    private Object user;

    public CustomUserDetails(Teacher teacher) {
        this.email = teacher.getEmail();
        this.password = teacher.getPassword();
        this.isTeacher = true;
        this.isStudent = false;
        this.user = teacher;
    }

    public CustomUserDetails(Student student) {
        this.email = student.getEmail();
        this.password = student.getPassword();
        this.isTeacher = false;
        this.isStudent = true;
        this.user = student;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isTeacher() {
        return isTeacher;
    }

    public boolean isStudent() {
        return isStudent;
    }
}
