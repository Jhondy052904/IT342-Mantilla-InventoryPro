package edu.cit.mantilla.inventorypro.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Standard error response format for API error responses
 * Provides consistent JSON structure for all error scenarios
 * 
 * Fields:
 * - timestamp: When the error occurred
 * - status: HTTP status code (e.g., 400, 401, 404, 500)
 * - error: Error type/code (e.g., "BAD_REQUEST", "UNAUTHORIZED")
 * - message: Human-readable error message
 * - path: API endpoint where error occurred
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    
    private int status;
    
    private String error;
    
    private String message;
    
    private String path;
    
    /**
     * Factory method to create ErrorResponse with all fields
     * 
     * @param status HTTP status code
     * @param error Error type/code
     * @param message Error message
     * @param path API path
     * @return ErrorResponse instance
     */
    public static ErrorResponse of(int status, String error, String message, String path) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status)
                .error(error)
                .message(message)
                .path(path)
                .build();
    }
}
