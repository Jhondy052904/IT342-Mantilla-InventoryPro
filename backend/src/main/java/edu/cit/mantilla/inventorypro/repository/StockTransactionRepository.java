package edu.cit.mantilla.inventorypro.repository;

import edu.cit.mantilla.inventorypro.entity.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockTransactionRepository 
    extends JpaRepository<StockTransaction, Long> {
    
    List<StockTransaction> findAllByOrderByCreatedAtDesc();
    List<StockTransaction> findByProductIdOrderByCreatedAtDesc(Long productId);
    List<StockTransaction> findByTypeOrderByCreatedAtDesc(String type);
}
