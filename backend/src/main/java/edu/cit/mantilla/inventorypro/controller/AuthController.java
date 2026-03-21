package edu.cit.mantilla.inventorypro.controller;

import edu.cit.mantilla.inventorypro.dto.AuthResponse;
import edu.cit.mantilla.inventorypro.dto.LoginRequest;
import edu.cit.mantilla.inventorypro.dto.RegisterRequest;
import edu.cit.mantilla.inventorypro.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Register a new user
     * 
     * @param request RegisterRequest containing firstName, lastName, email, and
     *                password
     * @return ResponseEntity with AuthResponse
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.error("REGISTRATION_FAILED", e.getMessage()));
        }
    }

    /**
     * Login a user
     * 
     * @param request LoginRequest containing email and password
     * @return ResponseEntity with AuthResponse
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.error("LOGIN_FAILED", e.getMessage()));
        }
    }
}
