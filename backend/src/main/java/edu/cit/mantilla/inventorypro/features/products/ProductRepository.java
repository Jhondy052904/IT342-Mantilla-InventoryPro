package edu.cit.mantilla.inventorypro.features.products;

import edu.cit.mantilla.inventorypro.features.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByCreatedAtDesc();

    List<Product> findAllByDeletedAtIsNullOrderByCreatedAtDesc();

    boolean existsBySku(String sku);
}