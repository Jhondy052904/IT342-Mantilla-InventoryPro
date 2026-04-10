package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.entity.Product;
import edu.cit.mantilla.inventorypro.exception.ProductNotFoundException;
import edu.cit.mantilla.inventorypro.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        // Reset id to null to let the DB generate it
        product.setId(null);
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setSku(updatedProduct.getSku());
        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setCurrentStock(updatedProduct.getCurrentStock());
        existing.setMinStockThreshold(updatedProduct.getMinStockThreshold());
        existing.setCategoryId(updatedProduct.getCategoryId());
        existing.setCategory(updatedProduct.getCategory());
        existing.setUnitPrice(updatedProduct.getUnitPrice());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }
}