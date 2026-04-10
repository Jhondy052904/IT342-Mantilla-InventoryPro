package edu.cit.mantilla.inventorypro.repository;

import edu.cit.mantilla.inventorypro.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByCreatedAtDesc();

    boolean existsBySku(String sku);
}