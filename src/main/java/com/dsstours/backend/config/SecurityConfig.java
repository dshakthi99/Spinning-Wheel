package com.dsstours.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;


@Configuration
@EnableWebSecurity
// @EnableMethodSecurity // To enable @PreAuthorize etc. on methods
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs if using tokens, enable otherwise
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll() // Allow registration
                .requestMatchers( "/api/destinations/**", "/api/tourpackages/**").permitAll() // Allow public access to view destinations/packages
                // .requestMatchers(HttpMethod.GET, "/api/destinations/**", "/api/tourpackages/**").permitAll() // Example: Allow GET for all
                // .requestMatchers(HttpMethod.POST, "/api/destinations", "/api/tourpackages").hasRole("ADMIN") // Example: Secure POST
                .anyRequest().authenticated() // All other requests require authentication
            )
            .httpBasic(Customizer.withDefaults()); // Use HTTP Basic auth for now, switch to JWT later
            // .formLogin(Customizer.withDefaults()); // Or formLogin

        return http.build();
    }

    // We would also need a UserDetailsService implementation, but Spring Boot
    // provides a default one if we have a PasswordEncoder bean and Spring Security starter.
    // For custom user details, we'd create a class implementing UserDetailsService.
}
