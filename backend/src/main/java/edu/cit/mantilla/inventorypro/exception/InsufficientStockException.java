package edu.cit.mantilla.inventorypro.exception;

/**
 * Exception thrown when attempting an operation that requires more stock than available
 * Typically used when processing orders or reserving inventory
 */
public class InsufficientStockException extends RuntimeException {
    
    private final int availableStock;
    private final int requestedQuantity;
    
    public InsufficientStockException(String message) {
        super(message);
        this.availableStock = 0;
        this.requestedQuantity = 0;
    }
    
    public InsufficientStockException(String message, int availableStock, int requestedQuantity) {
        super(message);
        this.availableStock = availableStock;
        this.requestedQuantity = requestedQuantity;
    }
    
    public InsufficientStockException(String message, Throwable cause) {
        super(message, cause);
        this.availableStock = 0;
        this.requestedQuantity = 0;
    }
    
    public int getAvailableStock() {
        return availableStock;
    }
    
    public int getRequestedQuantity() {
        return requestedQuantity;
    }
}
