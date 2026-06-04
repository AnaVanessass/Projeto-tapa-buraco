package estudante.ubiracy.palmassemburacos.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableJpaAuditing
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthenticationSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain securiyFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception{
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login/**", "/oauth2/**", "/error").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints/","/api/complaints/map-points", "/api/blocks/").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // 1. Evita redirecionar chamadas de API para o login (retorna 401 em vez de 302)
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                .oauth2Login(oauth -> oauth
                        .successHandler(oAuth2LoginSuccessHandler)
                )
                // 3. Configuração essencial de CSRF para SPAs (Axios/Fetch precisam ler o token)
                .csrf(AbstractHttpConfigurer::disable
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Endpoint interceptado pelo Spring
                        .logoutSuccessUrl("http://localhost:5173/") // Redireciona de volta para a Home do React
                        .invalidateHttpSession(true) // Destrói a sessão no servidor
                        .clearAuthentication(true) // Limpa o contexto de autenticação
                        .deleteCookies("JSESSIONID", "jwt_token") // Força o navegador a deletar os cookies
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // URL do seu React
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // ESSENCIAL para cookies/sessão funcionarem
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-XSRF-TOKEN"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
