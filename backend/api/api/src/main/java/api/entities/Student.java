package api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
//import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 50, nullable = false)
    private String firstName;

    @Column(length = 50, nullable = false)
    private String lastName;

    @Column(length = 50, nullable = false, unique = true)
    @Email
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean studentFlag;

    @ManyToMany(mappedBy = "students")
    private Set<VirtualClass> virtualClasses = new HashSet<>();

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
