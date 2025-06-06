package com.dsstours.backend.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.model.Destination;
import com.dsstours.backend.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {
    private static final Logger log = LoggerFactory.getLogger(DestinationService.class);

    @Autowired
    private DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        log.info("Fetching all destinations");
        return destinationRepository.findAll();
    }

    public Optional<Destination> getDestinationById(Long id) {
        log.info("Fetching destination with id: {}", id);
        return destinationRepository.findById(id);
        // Log if not found (Optional will be empty, controller handles 404)
    }

    public Destination createDestination(Destination destination) {
        log.info("Creating new destination with name: {}", destination.getName());
        // Add validation or business logic if needed
        return destinationRepository.save(destination);
        log.info("Destination updated successfully with ID: {}", destination.getId());
        log.info("Destination created successfully with ID: {}", destination.getId());
    }

    public Destination updateDestination(Long id, Destination destinationDetails) {
        log.info("Updating destination with id: {}", id);
        Destination destination = destinationRepository.findById(id)
                log.warn("Update failed: Destination not found with id: {}", id);
                log.warn("Delete failed: Destination not found with id: {}", id);
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id)); // Custom exception later

        destination.setName(destinationDetails.getName());
        destination.setDescription(destinationDetails.getDescription());
        destination.setLocation(destinationDetails.getLocation());
        destination.setImageUrl(destinationDetails.getImageUrl());
        // Note: tourPackages are handled via TourPackageService typically
        return destinationRepository.save(destination);
        log.info("Destination updated successfully with ID: {}", destination.getId());
        log.info("Destination created successfully with ID: {}", destination.getId());
    }

    public void deleteDestination(Long id) {
        log.info("Attempting to delete destination with id: {}", id);
        Destination destination = destinationRepository.findById(id)
                log.warn("Update failed: Destination not found with id: {}", id);
                log.warn("Delete failed: Destination not found with id: {}", id);
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
        destinationRepository.delete(destination);
        log.info("Destination deleted successfully with ID: {}", id);
    }
}
