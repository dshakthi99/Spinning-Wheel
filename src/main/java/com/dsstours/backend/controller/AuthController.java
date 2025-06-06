package com.dsstours.backend.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.dto.UserRegistrationDto;
import com.dsstours.backend.model.User;
import com.dsstours.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        log.info("Received registration request for username: {}", registrationDto.getUsername());
        // Add validation for registrationDto
        try {
            User newUser = userService.registerNewUser(registrationDto);
            log.info("User registration successful for username: {}", newUser.getUsername());
            return new ResponseEntity<>("User registered successfully. ID: " + newUser.getId(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            log.warn("User registration failed for username {}: {}", registrationDto.getUsername(), e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Basic login endpoint will be handled by Spring Security's default /login
    // if formLogin is enabled. For JWT or custom responses, we'd add a method here.
}
