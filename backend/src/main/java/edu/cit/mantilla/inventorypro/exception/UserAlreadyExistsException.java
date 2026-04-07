package edu.cit.mantilla.inventorypro.exception;

/**
 * Exception thrown when a user already exists in the system
 * Typically used during registration when an email is already registered
 */
public class UserAlreadyExistsException extends RuntimeException {
    
    public UserAlreadyExistsException(String message) {
        super(message);
    }
    
    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
