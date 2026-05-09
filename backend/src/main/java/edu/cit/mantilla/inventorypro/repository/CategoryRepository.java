package edu.cit.mantilla.inventorypro.repository;

import edu.cit.mantilla.inventorypro.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Find all active categories (non-deleted)
     * 
     * @return List of categories where deletedAt is null
     */
    List<Category> findAllByDeletedAtIsNull();

    /**
     * Find all categories including deleted ones
     * 
     * @return List of all categories for reports
     */
    List<Category> findAll();

    /**
     * Find category by ID including deleted ones
     * 
     * @param id Category ID
     * @return Category if found, null otherwise
     */
}
