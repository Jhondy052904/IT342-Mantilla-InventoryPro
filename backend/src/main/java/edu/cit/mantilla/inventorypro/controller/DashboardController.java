package edu.cit.mantilla.inventorypro.controller;

import edu.cit.mantilla.inventorypro.entity.Product;
import edu.cit.mantilla.inventorypro.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private static final Logger log = LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        try {
            List<Product> products = productService.getAllProducts();

            long totalProducts = products.size();
            long lowStockCount = products.stream()
                    .filter(p -> p.getCurrentStock() != null
                            && p.getMinStockThreshold() != null
                            && p.getCurrentStock() > 0
                            && p.getCurrentStock() <= p.getMinStockThreshold())
                    .count();
            long outOfStockCount = products.stream()
                    .filter(p -> p.getCurrentStock() != null && p.getCurrentStock() == 0)
                    .count();
            BigDecimal totalValue = products.stream()
                    .filter(p -> p.getUnitPrice() != null && p.getCurrentStock() != null)
                    .map(p -> p.getUnitPrice().multiply(BigDecimal.valueOf(p.getCurrentStock())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            Map<String, Object> stats = new LinkedHashMap<>();
            stats.put("totalProducts", totalProducts);
            stats.put("lowStockCount", lowStockCount);
            stats.put("outOfStockCount", outOfStockCount);
            stats.put("totalValue", totalValue);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Dashboard stats error: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/trends")
    public ResponseEntity<List<Object>> getTrends() {
        // Placeholder — returns empty list until trends feature is implemented
        return ResponseEntity.ok(Collections.emptyList());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<Object>> getActivities() {
        // Placeholder — returns empty list until activity log is implemented
        return ResponseEntity.ok(Collections.emptyList());
    }
}