package com.dsstours.backend.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dsstours.backend.model.User;
import com.dsstours.backend.repository.UserRepository;
import com.dsstours.backend.dto.UserRegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Will be configured later
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Autowire this after configuring it

    public User registerNewUser(UserRegistrationDto registrationDto) {
        if (userRepository.findByUsername(registrationDto.getUsername()).isPresent()) {
            log.warn("Registration failed: Username {} already exists", registrationDto.getUsername());
            throw new RuntimeException("Username already exists"); // More specific exception later
        }
        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            log.warn("Registration failed: Email {} already exists", registrationDto.getEmail());
            throw new RuntimeException("Email already exists");
        }

        log.info("Attempting to register new user with username: {}", registrationDto.getUsername());
        User newUser = new User();
        newUser.setUsername(registrationDto.getUsername());
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword())); // Encode password

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER"); // Default role
        newUser.setRoles(roles);

        newUser.setEnabled(true);

        log.info("Successfully registered user with username: {} and ID: {}", newUser.getUsername(), newUser.getId());
        return userRepository.save(newUser);
        // Consider adding a try-catch here if save can throw specific exceptions you want to log
    }
}
