package com.dsstours.backend.model;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Lob // For potentially long text
    @Column(nullable = false)
    private String description;

    private String location; // Could be more complex (e.g., coordinates)
    private String imageUrl;


    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<TourPackage> tourPackages = new HashSet<>();

    // Constructors, Getters, Setters
    public Destination() {}

    public Destination(String name, String description, String location, String imageUrl) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Set<TourPackage> getTourPackages() { return tourPackages; }
    public void setTourPackages(Set<TourPackage> tourPackages) { this.tourPackages = tourPackages; }
}
