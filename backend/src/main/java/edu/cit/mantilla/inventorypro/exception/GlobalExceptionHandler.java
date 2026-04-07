package edu.cit.mantilla.inventorypro.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

/**
 * Global Exception Handler using @RestControllerAdvice
 * 
 * Centralizes error handling across all controllers and services.
 * Provides consistent JSON error responses for all exception types.
 * 
 * Benefits:
 * - Eliminates repetitive try-catch blocks in controllers
 * - Ensures uniform error response format across the API
 * - Easy to add new exception handlers as features grow
 * - Cleaner controllers focusing on business logic
 * - Centralized logging of all errors
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    /**
     * Handle UserAlreadyExistsException (typically 409 Conflict)
     * Occurs when attempting to register with an email that already exists
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(
            UserAlreadyExistsException ex,
            HttpServletRequest request) {
        
        log.warn("User already exists: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.CONFLICT.value(),
                "USER_ALREADY_EXISTS",
                ex.getMessage(),
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
    
    /**
     * Handle ProductNotFoundException (typically 404 Not Found)
     * Occurs when querying for a product that doesn't exist
     */
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFound(
            ProductNotFoundException ex,
            HttpServletRequest request) {
        
        log.warn("Product not found: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.NOT_FOUND.value(),
                "PRODUCT_NOT_FOUND",
                ex.getMessage(),
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    /**
     * Handle InsufficientStockException (typically 400 Bad Request)
     * Occurs when attempting to process an order with insufficient stock
     */
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientStock(
            InsufficientStockException ex,
            HttpServletRequest request) {
        
        log.warn("Insufficient stock: {} (available: {}, requested: {})",
                ex.getMessage(),
                ex.getAvailableStock(),
                ex.getRequestedQuantity());
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "INSUFFICIENT_STOCK",
                ex.getMessage(),
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * Handle validation errors from @Valid annotation (typically 400 Bad Request)
     * Occurs when request body validation fails
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .reduce((m1, m2) -> m1 + ", " + m2)
                .orElse("Validation failed");
        
        log.warn("Validation error: {}", message);
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "VALIDATION_FAILED",
                message,
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * Handle generic IllegalArgumentException (typically 400 Bad Request)
     * Fallback for service-layer business logic exceptions
     * 
     * Used for:
     * - Invalid credentials during login
     * - Invalid input parameters
     * - Business rule violations
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(
            IllegalArgumentException ex,
            HttpServletRequest request) {
        
        log.warn("Invalid argument: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "INVALID_REQUEST",
                ex.getMessage(),
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * Handle all other uncaught exceptions (typically 500 Internal Server Error)
     * Generic fallback handler for unexpected errors
     * 
     * Should be investigated and more specific handlers added as needed
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex,
            HttpServletRequest request) {
        
        log.error("Unexpected error occurred", ex);
        
        ErrorResponse error = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "INTERNAL_SERVER_ERROR",
                "An unexpected error occurred. Please try again later.",
                request.getRequestURI()
        );
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
