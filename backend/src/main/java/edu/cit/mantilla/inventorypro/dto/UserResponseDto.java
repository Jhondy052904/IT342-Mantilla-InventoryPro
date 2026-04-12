package edu.cit.mantilla.inventorypro.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for User responses
 * Excludes sensitive information like password hash
 */
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String userRole;
    private LocalDateTime createdAt;

    // Default constructor
    public UserResponseDto() {}

    // All args constructor
    public UserResponseDto(Long id, String email, String firstName, String lastName, String userRole, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
