package edu.cit.mantilla.inventorypro.config;

import edu.cit.mantilla.inventorypro.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtFilter jwtFilter;
        private final UserDetailsServiceImpl userDetailsService;

        /**
         * Configure BCryptPasswordEncoder bean for password hashing
         */
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        /**
         * Configure authentication manager
         */
        @Bean
        public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
                AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
                authBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
                return authBuilder.build();
        }

        /**
         * Configure CORS settings to allow requests from React frontend.
         * This bean is used by Spring Security's CORS filter.
         */
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // Allow requests from React frontend on ports 5173 (Vite) and 3000 (CRA)
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));

                // Allow all HTTP methods (GET, POST, PUT, DELETE, OPTIONS, PATCH)
                configuration.setAllowedMethods(Arrays.asList(
                                HttpMethod.GET.name(),
                                HttpMethod.POST.name(),
                                HttpMethod.PUT.name(),
                                HttpMethod.DELETE.name(),
                                HttpMethod.PATCH.name(),
                                HttpMethod.OPTIONS.name()));

                // Allow necessary headers
                configuration.setAllowedHeaders(Arrays.asList("*"));

                // Expose headers to the client (e.g., Authorization header)
                configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));

                // Allow credentials (Authorization headers, cookies)
                configuration.setAllowCredentials(true);

                // Cache preflight response for 1 hour
                configuration.setMaxAge(3600L);

                // Apply this CORS configuration to all endpoints
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);

                return source;
        }

        /**
         * Configure Spring Security filter chain for REST API.
         * 
         * Security configuration:
         * - CORS is enabled and applied as the first filter
         * - CSRF is disabled (appropriate for stateless REST APIs with token-based
         * auth)
         * - Session management is stateless (no session cookies)
         * - /api/auth/** endpoints are publicly accessible
         * - All other endpoints require authentication
         * - Uses modern Spring Security 6+ syntax (no deprecated methods)
         */
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                // Enable CORS and apply it before other security filters
                                // This ensures preflight (OPTIONS) requests are handled correctly
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                // Disable CSRF for stateless REST API
                                // (not needed when using token-based authentication)
                                .csrf(csrf -> csrf.disable())

                                // Use stateless session management (no session cookies)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                // Configure endpoint authorization
                                .authorizeHttpRequests(authz -> authz
                                                // Allow OPTIONS requests for CORS preflight without authentication
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                                // Public endpoints - authentication not required
                                                .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()

                                                // All other endpoints require authentication
                                                .anyRequest().authenticated())

                                // Add JWT filter before UsernamePasswordAuthenticationFilter
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
