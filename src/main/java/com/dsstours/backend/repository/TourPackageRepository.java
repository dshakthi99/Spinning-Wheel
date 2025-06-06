package com.dsstours.backend.repository;

import com.dsstours.backend.model.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {
    List<TourPackage> findByDestinationId(Long destinationId);
}
