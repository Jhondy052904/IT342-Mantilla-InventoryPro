package edu.cit.mantilla.inventorypro.controller;

import edu.cit.mantilla.inventorypro.entity.StockTransaction;
import edu.cit.mantilla.inventorypro.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {

    @Autowired
    private StockService stockService;

    /**
     * POST /api/stock/in
     * Body: { productId, userId, quantity, remarks }
     */
    @PostMapping("/in")
    public ResponseEntity<?> stockIn(@RequestBody Map<String, Object> body) {
        try {
            Long productId = Long.valueOf(body.get("productId").toString());
            Long userId = Long.valueOf(body.get("userId").toString());
            Integer quantity = Integer.valueOf(body.get("quantity").toString());
            String remarks = (String) body.getOrDefault("remarks", "");

            StockTransaction result = stockService.stockIn(
                productId, userId, quantity, remarks);
            return ResponseEntity.status(201).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body("Stock in failed: " + e.getMessage());
        }
    }

    /**
     * POST /api/stock/out
     * Body: { productId, userId, quantity, remarks }
     */
    @PostMapping("/out")
    public ResponseEntity<?> stockOut(@RequestBody Map<String, Object> body) {
        try {
            Long productId = Long.valueOf(body.get("productId").toString());
            Long userId = Long.valueOf(body.get("userId").toString());
            Integer quantity = Integer.valueOf(body.get("quantity").toString());
            String remarks = (String) body.getOrDefault("remarks", "");

            StockTransaction result = stockService.stockOut(
                productId, userId, quantity, remarks);
            return ResponseEntity.status(201).body(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400)
                .body("Stock out failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body("Stock out failed: " + e.getMessage());
        }
    }

    /**
     * GET /api/stock/logs
     * Returns all stock transaction logs
     */
    @GetMapping("/logs")
    public ResponseEntity<?> getLogs(
            @RequestParam(required = false) Long productId) {
        try {
            if (productId != null) {
                return ResponseEntity.ok(
                    stockService.getLogsByProduct(productId));
            }
            return ResponseEntity.ok(stockService.getAllLogs());
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body("Failed to get logs: " + e.getMessage());
        }
    }
}
