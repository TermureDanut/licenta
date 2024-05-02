package api.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        return Jwts.builder().subject(username).issuedAt(new Date()).expiration(expireDate).signWith(key()).compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUsername(String token) {
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token) throws Exception {
        try {
            Jwts.parser().verifyWith((SecretKey) key()).build().parse(token);
        } catch (MalformedJwtException malformedJwtException) {
            throw new Exception("Invalid Token");
        } catch (ExpiredJwtException expiredJwtException) {
            throw new Exception("Expired Token");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            throw new Exception("Unsupported Token");
        } catch (IllegalArgumentException illegalArgumentException) {
            throw new Exception("Jwt claims string is empty");
        }

        return true;
    }
}
