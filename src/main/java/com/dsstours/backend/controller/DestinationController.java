package com.dsstours.backend.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.model.Destination;
import com.dsstours.backend.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {
    private static final Logger log = LoggerFactory.getLogger(DestinationController.class);

    @Autowired
    private DestinationService destinationService;

    @GetMapping
    public List<Destination> getAllDestinations() {
        log.info("GET /api/destinations - fetching all destinations");
        return destinationService.getAllDestinations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        log.info("GET /api/destinations/{} - fetching destination by id", id);
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .map(dest -> { log.info("Found destination with id: {}", id); return ResponseEntity.ok(dest); })
                .orElseGet(() -> { log.warn("Destination not found with id: {}", id); return ResponseEntity.notFound().build(); });
    }

    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')") // Add security later
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        log.info("POST /api/destinations - creating new destination: {}", destination.getName());
        // Add validation
        Destination createdDestination = destinationService.createDestination(destination);
        log.info("Destination {} created successfully with id {}", createdDestination.getName(), createdDestination.getId());
        return new ResponseEntity<>(createdDestination, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Destination> updateDestination(@PathVariable Long id, @RequestBody Destination destinationDetails) {
        log.info("PUT /api/destinations/{} - updating destination", id);
        // Add validation
        try {
            Destination updatedDestination = destinationService.updateDestination(id, destinationDetails);
            log.info("Destination with id {} updated successfully.", updatedDestination.getId());
            return ResponseEntity.ok(updatedDestination);
        } catch (RuntimeException e) { // Replace with more specific exceptions
            log.warn("Failed to update destination with id {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        log.info("DELETE /api/destinations/{} - deleting destination", id);
        try {
            destinationService.deleteDestination(id);
            log.info("Destination with id {} deleted successfully.", id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.warn("Failed to delete destination with id {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
