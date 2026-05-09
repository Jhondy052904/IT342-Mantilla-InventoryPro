package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.entity.Product;
import edu.cit.mantilla.inventorypro.entity.StockTransaction;
import edu.cit.mantilla.inventorypro.repository.ProductRepository;
import edu.cit.mantilla.inventorypro.repository.StockTransactionRepository;
import edu.cit.mantilla.inventorypro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Stock In — increases product current_stock
     */
    public StockTransaction stockIn(Long productId, Long userId, 
                                    Integer quantity, String remarks) {
        // 1. Find product or throw
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Increase stock
        int newStock = (product.getCurrentStock() == null ? 0 
            : product.getCurrentStock()) + quantity;
        product.setCurrentStock(newStock);
        productRepository.save(product);

        // 3. Create transaction log
        StockTransaction transaction = new StockTransaction();
        transaction.setProductId(productId);
        transaction.setUserId(userId);
        transaction.setType("STOCK_IN");
        transaction.setQuantity(quantity);
        transaction.setRemarks(remarks);

        return stockTransactionRepository.save(transaction);
    }

    /**
     * Stock Out — decreases product current_stock
     */
    public StockTransaction stockOut(Long productId, Long userId,
                                     Integer quantity, String remarks) {
        // 1. Find product or throw
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Validate sufficient stock
        int currentStock = product.getCurrentStock() == null 
            ? 0 : product.getCurrentStock();
        if (currentStock < quantity) {
            throw new RuntimeException(
                "Insufficient stock. Available: " + currentStock);
        }

        // 3. Decrease stock
        product.setCurrentStock(currentStock - quantity);
        productRepository.save(product);

        // 4. Create transaction log
        StockTransaction transaction = new StockTransaction();
        transaction.setProductId(productId);
        transaction.setUserId(userId);
        transaction.setType("STOCK_OUT");
        transaction.setQuantity(quantity);
        transaction.setRemarks(remarks);

        return stockTransactionRepository.save(transaction);
    }

    /**
     * Get all stock transaction logs
     */
    public List<StockTransaction> getAllLogs() {
        return stockTransactionRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Get logs by product
     */
    public List<StockTransaction> getLogsByProduct(Long productId) {
        return stockTransactionRepository
            .findByProductIdOrderByCreatedAtDesc(productId);
    }
}
