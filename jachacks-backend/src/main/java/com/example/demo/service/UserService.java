package com.example.demo.service;

import com.example.demo.DTO.UserDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.OrganizationRepository;
import com.example.demo.repository.ReceiptRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class UserService {

    private static UserRepository userRepository;
    private static OrganizationRepository organizationRepository;
    private static ReceiptRepository receiptRepository;

    public UserService(UserRepository userRepository, OrganizationRepository organizationRepository, ReceiptRepository receiptRepository) {
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.receiptRepository = receiptRepository;
    }

    // Other methods

    public void depositBalance(Long userId, BigDecimal amount) {
        UserEntity user = getUserById(userId);
        if (user.getBalance() == null) {
            user.setBalance(amount);
        } else {
            user.setBalance(user.getBalance().add(amount));
        }
        userRepository.save(user);
    }

    public void donateBalance(Long userId, Long organizationId, BigDecimal amount) {
        UserEntity user = getUserById(userId);
        OrganizationEntity organization = organizationRepository.findById(organizationId).orElseThrow(() -> new RuntimeException("Organization not found"));

        // Check if the user has enough balance
        if (user.getBalance() == null || user.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance to make a donation");
        }

        // Deduct the donation amount from the user's balance
        user.setBalance(user.getBalance().subtract(amount));
        userRepository.save(user);

        // Create a receipt for the donation
        ReceiptEntity receipt = new ReceiptEntity(user, organization, amount);
        receiptRepository.save(receipt);

        // Optionally, you can also update the organization's balance if necessary
//        organization.setBalance(organization.getBalance().add(amount));
//        organizationRepository.save(organization);
    }

    public UserEntity getUserById(Long userId) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        return userOptional.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public static UserEntity getUserByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id).orElse(null);
    }

    public static UserDTO registerUser(Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String email = jwt.getClaimAsString("email");

        UserEntity user = userRepository.findByAuth0Id(auth0Id).orElseGet(() -> {
            UserEntity newUser = new UserEntity();
            newUser.setAuth0Id(auth0Id);
            newUser.setEmail(email);
            return userRepository.save(newUser);
        });

        return new UserDTO(user);
    }
}
