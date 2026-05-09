package edu.cit.mantilla.inventorypro.service;

import edu.cit.mantilla.inventorypro.entity.Category;
import edu.cit.mantilla.inventorypro.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Get all active categories (non-deleted)
     * @return List of active categories
     */
    public List<Category> getAllActiveCategories() {
        return categoryRepository.findAllByDeletedAtIsNull();
    }

    /**
     * Get all categories including deleted ones (for reports)
     * @return List of all categories
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Create a new category
     * @param category Category to create
     * @return Created category
     */
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    /**
     * Update an existing category
     * @param id Category ID
     * @param updated Updated category data
     * @return Updated category
     * @throws RuntimeException if category not found
     */
    public Category updateCategory(Long id, Category updated) {
        Category existing = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        
        return categoryRepository.save(existing);
    }

    /**
     * Soft delete a category by setting deletedAt timestamp
     * @param id Category ID to soft delete
     * @throws RuntimeException if category not found
     */
    public void softDeleteCategory(Long id) {
        Category existing = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        
        existing.setDeletedAt(LocalDateTime.now());
        categoryRepository.save(existing);
    }
}
