package estudante.ubiracy.palmassemburacos.config;

import estudante.ubiracy.palmassemburacos.model.User;
import estudante.ubiracy.palmassemburacos.service.JwtService;
import estudante.ubiracy.palmassemburacos.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@AllArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");

        if (email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found");
            return;
        }

        User user = userService.processOAuthPostLogin(oauthUser);
        String token = jwtService.generateToken(user.getEmail());

        Cookie jwtCookie = new Cookie("jwt_token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(86400); // 1 dia
        // jwtCookie.setSecure(true); // Habilite apenas se usar HTTPS em produção

        response.addCookie(jwtCookie);

        boolean profileComplete = user.getUsername() != null;

        String targetUrl = "http://localhost:5173/auth-callback?profileComplete=" + profileComplete;
        response.sendRedirect(targetUrl);
    }
}
