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

/**
 * Authentication Controller
 * 
 * Handles user registration and login endpoints.
 * Error handling is delegated to GlobalExceptionHandler.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Register a new user
     * 
     * @param request RegisterRequest containing firstName, lastName, email, and password
     * @return ResponseEntity with AuthResponse (HTTP 201 Created)
     * @throws UserAlreadyExistsException if email is already registered
     * @throws IllegalArgumentException if validation fails
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Login a user
     * 
     * @param request LoginRequest containing email and password
     * @return ResponseEntity with AuthResponse (HTTP 200 OK)
     * @throws IllegalArgumentException if credentials are invalid
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
