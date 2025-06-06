package com.dsstours.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_package_id", nullable = false)
    private TourPackage tourPackage;

    @Column(nullable = false)
    private LocalDate bookingDate;

    private Integer numberOfTravelers;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;


    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }

    // Constructors, Getters, Setters
    public Booking() {}

    public Booking(User user, TourPackage tourPackage, LocalDate bookingDate, Integer numberOfTravelers, BookingStatus status) {
        this.user = user;
        this.tourPackage = tourPackage;
        this.bookingDate = bookingDate;
        this.numberOfTravelers = numberOfTravelers;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public TourPackage getTourPackage() { return tourPackage; }
    public void setTourPackage(TourPackage tourPackage) { this.tourPackage = tourPackage; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public Integer getNumberOfTravelers() { return numberOfTravelers; }
    public void setNumberOfTravelers(Integer numberOfTravelers) { this.numberOfTravelers = numberOfTravelers; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
}
