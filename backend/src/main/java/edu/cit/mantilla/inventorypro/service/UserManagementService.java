package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.entity.User;
import edu.cit.mantilla.inventorypro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * Get all users
     * 
     * @return List of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get user by ID
     * 
     * @param id User ID
     * @return User entity
     * @throws RuntimeException if user not found
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    /**
     * Create a new user
     * 
     * @param user User entity with password (plain text)
     * @return Created user entity
     */
    public User createUser(User user) {
        // Hash the password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        // Set timestamps
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    /**
     * Update an existing user
     * 
     * @param id          User ID
     * @param updatedUser Updated user entity
     * @return Updated user entity
     * @throws RuntimeException if user not found
     */
    public User updateUser(Long id, User updatedUser) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existing.setFirstName(updatedUser.getFirstName());
        existing.setLastName(updatedUser.getLastName());

        // Only update role if provided, keep existing role if null
        if (updatedUser.getRole() != null) {
            existing.setRole(updatedUser.getRole());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(existing);
    }

    /**
     * Delete a user by ID
     * 
     * @param id User ID
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
