package edu.cit.mantilla.inventorypro.controller;

import edu.cit.mantilla.inventorypro.dto.UserResponseDto;
import edu.cit.mantilla.inventorypro.entity.User;
import edu.cit.mantilla.inventorypro.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    /**
     * Get all users
     * 
     * @return List of users without password hashes
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<User> users = userManagementService.getAllUsers();
        List<UserResponseDto> userDtos = users.stream()
                .map(this::convertToUserResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    /**
     * Create a new user
     * 
     * @param userRequest User data with password
     * @return Created user without password hash
     */
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody User userRequest) {
        User createdUser = userManagementService.createUser(userRequest);
        UserResponseDto userDto = convertToUserResponseDto(createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    /**
     * Update an existing user
     * 
     * @param id   User ID
     * @param body Updated user data
     * @return Updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        try {
            User updated = new User();
            updated.setFirstName((String) body.get("firstName"));
            updated.setLastName((String) body.get("lastName"));
            String userRoleStr = (String) body.get("userRole");
            if (userRoleStr != null) {
                updated.setRole(User.Role.valueOf(userRoleStr.toUpperCase()));
            }
            User saved = userManagementService.updateUser(id, updated);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error: " + e.getMessage());
        }
    }

    /**
     * Delete a user
     * 
     * @param id User ID
     * @return No content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userManagementService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Convert User entity to UserResponseDto (excludes password hash)
     * 
     * @param user User entity
     * @return UserResponseDto
     */
    private UserResponseDto convertToUserResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserRole(user.getRole().toString()); // Convert enum to string
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
