package edu.cit.mantilla.inventorypro.exception;

/**
 * Exception thrown when a product cannot be found in the database
 * Typically used in product service/controller when querying by ID or other attributes
 */
public class ProductNotFoundException extends RuntimeException {
    
    public ProductNotFoundException(String message) {
        super(message);
    }
    
    public ProductNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
