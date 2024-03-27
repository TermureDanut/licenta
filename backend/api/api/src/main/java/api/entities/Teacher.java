package api.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
//import java.util.Base64;
import java.util.List;

@Entity
@Table(name = "t_teachers")
public class Teacher {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id;

    @Column(name = "first_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    @Getter
    @Setter
    private String lastName;

    @Column(name = "email", length = 50, nullable = false)
    @Getter
    @Setter
    private String email;

    @Column(name = "password", length = 100, nullable = false)
    @Getter
    @Setter
    private String password;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<VirtualClass> virtualClasses = new ArrayList<>();
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<InfoProblem> infoProblems = new ArrayList<>();

    public Teacher() {
    }

    //    public void setPassword(String password) {
    //        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    //        this.password = passwordEncoder.encode(password);
    //    }

    //    public void setPassword(String password) {
    //        try {
    //            MessageDigest digest = MessageDigest.getInstance("SHA-256");
    //            byte[] hash = digest.digest(password.getBytes());
    //            String encodedPassword = Base64.getEncoder().encodeToString(hash);
    //            this.password = encodedPassword;
    //        } catch (NoSuchAlgorithmException e) {
    //            e.printStackTrace();
    //        }
    //    }
    public void addVirtualClass(VirtualClass virtualClass) {
        virtualClasses.add(virtualClass);
    }

    public void addInfoProblem(InfoProblem infoProblem) {
        infoProblems.add(infoProblem);
    }
}
