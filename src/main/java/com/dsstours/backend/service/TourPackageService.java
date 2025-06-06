package com.dsstours.backend.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.model.TourPackage;
import com.dsstours.backend.model.Destination;
import com.dsstours.backend.repository.TourPackageRepository;
import com.dsstours.backend.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TourPackageService {
    private static final Logger log = LoggerFactory.getLogger(TourPackageService.class);

    @Autowired
    private TourPackageRepository tourPackageRepository;

    @Autowired
    private DestinationRepository destinationRepository; // To link package to destination

    public List<TourPackage> getAllTourPackages() {
        log.info("Fetching all tour packages");
        return tourPackageRepository.findAll();
    }

    public List<TourPackage> getTourPackagesByDestinationId(Long destinationId) {
        log.info("Fetching tour packages for destination id: {}", destinationId);
        return tourPackageRepository.findByDestinationId(destinationId);
    }

    public Optional<TourPackage> getTourPackageById(Long id) {
        log.info("Fetching tour package with id: {}", id);
        return tourPackageRepository.findById(id);
    }

    public TourPackage createTourPackage(TourPackage tourPackage, Long destinationId) {
        log.info("Creating new tour package \"{}\" for destination ID: {}", tourPackage.getName(), destinationId);
        Destination destination = destinationRepository.findById(destinationId)
            log.warn("Tour package creation failed: Destination not found with id: {}", destinationId);
            .orElseThrow(() -> new RuntimeException("Destination not found with id: " + destinationId));
        tourPackage.setDestination(destination);
        return tourPackageRepository.save(tourPackage);
        log.info("Tour package updated successfully with ID: {}", tourPackage.getId());
        log.info("Tour package created successfully with ID: {}", tourPackage.getId());
    }

    public TourPackage updateTourPackage(Long id, TourPackage packageDetails) {
        log.info("Updating tour package with id: {}", id);
        TourPackage tourPackage = tourPackageRepository.findById(id)
                log.warn("Update failed: Tour package not found with id: {}", id);
                log.warn("Delete failed: Tour package not found with id: {}", id);
                .orElseThrow(() -> new RuntimeException("TourPackage not found with id: " + id));

        tourPackage.setName(packageDetails.getName());
        tourPackage.setDescription(packageDetails.getDescription());
        tourPackage.setPrice(packageDetails.getPrice());
        tourPackage.setDurationDays(packageDetails.getDurationDays());
        // Destination change would be a more complex operation, handle separately if needed

        return tourPackageRepository.save(tourPackage);
        log.info("Tour package updated successfully with ID: {}", tourPackage.getId());
        log.info("Tour package created successfully with ID: {}", tourPackage.getId());
    }

    public void deleteTourPackage(Long id) {
        log.info("Attempting to delete tour package with id: {}", id);
        TourPackage tourPackage = tourPackageRepository.findById(id)
                log.warn("Update failed: Tour package not found with id: {}", id);
                log.warn("Delete failed: Tour package not found with id: {}", id);
                .orElseThrow(() -> new RuntimeException("TourPackage not found with id: " + id));
        tourPackageRepository.delete(tourPackage);
        log.info("Tour package deleted successfully with ID: {}", id);
    }
}
