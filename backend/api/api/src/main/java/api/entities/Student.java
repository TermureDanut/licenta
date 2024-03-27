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
@Table(name = "t_students")
public class Student {
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

    @Column(name = "email", length = 50, nullable = false, unique = true)
    @Getter
    @Setter
    private String email;

    @Column(name = "password", length = 100, nullable = false)
    @Getter
    @Setter
    private String password;

    @ManyToMany(mappedBy = "students")
    private List<VirtualClass> virtualClasses = new ArrayList<>();

    public Student() {
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
}
