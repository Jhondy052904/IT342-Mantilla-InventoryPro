package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.config.JwtUtil;
import edu.cit.mantilla.inventorypro.dto.AuthResponse;
import edu.cit.mantilla.inventorypro.dto.LoginRequest;
import edu.cit.mantilla.inventorypro.dto.RegisterRequest;
import edu.cit.mantilla.inventorypro.entity.User;
import edu.cit.mantilla.inventorypro.exception.UserAlreadyExistsException;
import edu.cit.mantilla.inventorypro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication Service
 * 
 * Handles user registration and login business logic.
 * Throws specific exceptions that are handled by GlobalExceptionHandler.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;

        /**
         * Register a new user
         * 
         * @param request RegisterRequest containing firstName, lastName, email, and password
         * @return AuthResponse with success status, user details, and JWT tokens
         * @throws UserAlreadyExistsException if email is already registered
         */
        public AuthResponse register(RegisterRequest request) {
                // Check if email already exists - throw custom exception
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new UserAlreadyExistsException("Email '" + request.getEmail() + "' is already registered");
                }

                // Create new user entity with firstName, lastName, and passwordHash
                User user = User.builder()
                                .firstName(request.getFirstName())
                                .lastName(request.getLastName())
                                .email(request.getEmail())
                                .passwordHash(passwordEncoder.encode(request.getPassword()))
                                .role(User.Role.USER) // Default role
                                .build();

                // Save user to database
                User savedUser = userRepository.save(user);

                // Generate JWT tokens
                String accessToken = jwtUtil.generateAccessToken(savedUser.getEmail());
                String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail());

                // Return success response with tokens
                return AuthResponse.success(
                                accessToken,
                                refreshToken,
                                savedUser.getEmail(),
                                savedUser.getFirstName(),
                                savedUser.getLastName(),
                                savedUser.getRole().name());
        }

        /**
         * Login a user
         * 
         * @param request LoginRequest containing email and password
         * @return AuthResponse with success status, user details, and JWT tokens
         * @throws IllegalArgumentException if credentials are invalid
         */
        public AuthResponse login(LoginRequest request) {
                // Find user by email - throw IllegalArgumentException if not found
                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

                // Verify password using BCrypt (compare raw password with passwordHash)
                if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                        throw new IllegalArgumentException("Invalid email or password");
                }

                // Generate JWT tokens
                String accessToken = jwtUtil.generateAccessToken(user.getEmail());
                String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

                // Return success response with tokens
                return AuthResponse.success(
                                accessToken,
                                refreshToken,
                                user.getEmail(),
                                user.getFirstName(),
                                user.getLastName(),
                                user.getRole().name());
        }
}
