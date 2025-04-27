package com.example.demo.controller;

import com.example.demo.DTO.DonationDTO;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.OrganizationRepository;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/donation")
public class BalanceController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    // Donate to multiple organizations
    @PostMapping
    public ResponseEntity<Map<String, Object>> donateToOrganizations(@RequestBody DonationDTO donationDTO) {
        try {
            BalanceService.donate(donationDTO);
            return ResponseEntity.ok(Map.of("message", "Donation successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
