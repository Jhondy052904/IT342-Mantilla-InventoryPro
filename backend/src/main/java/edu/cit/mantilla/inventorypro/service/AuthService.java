package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.dto.AuthResponse;
import edu.cit.mantilla.inventorypro.dto.LoginRequest;
import edu.cit.mantilla.inventorypro.dto.RegisterRequest;
import edu.cit.mantilla.inventorypro.entity.User;
import edu.cit.mantilla.inventorypro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * Register a new user
     * @param request RegisterRequest containing name, email, and password
     * @return AuthResponse with success status and user details
     * @throws IllegalArgumentException if email already exists
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        // Create new user entity
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Return success response
        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .user(AuthResponse.UserDTO.builder()
                        .id(savedUser.getId())
                        .name(savedUser.getName())
                        .email(savedUser.getEmail())
                        .build())
                .build();
    }
    
    /**
     * Login a user
     * @param request LoginRequest containing email and password
     * @return AuthResponse with success status and user details
     * @throws IllegalArgumentException if credentials are invalid
     */
    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        
        // Verify password (using BCrypt comparison)
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        // Return success response
        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .build())
                .build();
    }
}
