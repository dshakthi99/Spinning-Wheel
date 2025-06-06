package com.dsstours.backend.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.model.TourPackage;
import com.dsstours.backend.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tourpackages")
public class TourPackageController {
    private static final Logger log = LoggerFactory.getLogger(TourPackageController.class);

    @Autowired
    private TourPackageService tourPackageService;

    @GetMapping
    public List<TourPackage> getAllTourPackages(@RequestParam(required = false) Long destinationId) {
        if (destinationId != null) { log.info("GET /api/tourpackages?destinationId={} - fetching tour packages for destination", destinationId); } else { log.info("GET /api/tourpackages - fetching all tour packages"); }
        if (destinationId != null) {
            return tourPackageService.getTourPackagesByDestinationId(destinationId);
        }
        return tourPackageService.getAllTourPackages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourPackage> getTourPackageById(@PathVariable Long id) {
        log.info("GET /api/tourpackages/{} - fetching tour package by id", id);
        return tourPackageService.getTourPackageById(id)
                .map(ResponseEntity::ok)
                .map(pkg -> { log.info("Found tour package with id: {}", id); return ResponseEntity.ok(pkg); })
                .orElseGet(() -> { log.warn("Tour package not found with id: {}", id); return ResponseEntity.notFound().build(); });
    }

    // Note: In a real app, tourPackage.destination might be just an ID in the RequestBody DTO
    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourPackage> createTourPackage(@RequestBody TourPackage tourPackage, @RequestParam Long destinationId) {
        log.info("POST /api/tourpackages?destinationId={} - creating new tour package: {}", destinationId, tourPackage.getName());
        // Add validation for tourPackage DTO
        try {
            TourPackage createdPackage = tourPackageService.createTourPackage(tourPackage, destinationId);
        log.info("Tour package {} created successfully with id {}", createdPackage.getName(), createdPackage.getId());
            return new ResponseEntity<>(createdPackage, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            log.warn("Failed to delete tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to update tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to create tour package for destination id {}: {}", destinationId, e.getMessage());
            return ResponseEntity.badRequest().body(null); // Or a proper error response
        }
    }

    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourPackage> updateTourPackage(@PathVariable Long id, @RequestBody TourPackage packageDetails) {
        log.info("PUT /api/tourpackages/{} - updating tour package", id);
        // Add validation
        try {
            TourPackage updatedPackage = tourPackageService.updateTourPackage(id, packageDetails);
            log.info("Tour package with id {} updated successfully.", updatedPackage.getId());
            return ResponseEntity.ok(updatedPackage);
        } catch (RuntimeException e) {
            log.warn("Failed to delete tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to update tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to create tour package for destination id {}: {}", destinationId, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTourPackage(@PathVariable Long id) {
        log.info("DELETE /api/tourpackages/{} - deleting tour package", id);
        try {
            tourPackageService.deleteTourPackage(id);
            log.info("Tour package with id {} deleted successfully.", id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.warn("Failed to delete tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to update tour package with id {}: {}", id, e.getMessage());
            log.warn("Failed to create tour package for destination id {}: {}", destinationId, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
