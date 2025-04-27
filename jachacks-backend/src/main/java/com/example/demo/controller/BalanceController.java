package com.example.demo.controller;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.OrganizationRepository;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

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
    @PostMapping("/donate")
    public String donateToOrganizations(
            @RequestParam Long userId,
            @RequestParam List<Long> organizationIds,
            @RequestParam BigDecimal totalAmount) {

        if (organizationIds == null || organizationIds.isEmpty()) {
            return "Error: No organizations provided.";
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        BigDecimal splitAmount = totalAmount.divide(
                BigDecimal.valueOf(organizationIds.size()),
                2, RoundingMode.HALF_UP);


        for (Long orgId : organizationIds) {
            OrganizationEntity organization = organizationRepository.findById(orgId)
                    .orElseThrow(() -> new RuntimeException("Organization not found"));

            ReceiptEntity receipt = new ReceiptEntity();
            receipt.setUser(user);
            receipt.setOrganization(organization);
            receipt.setAmount(splitAmount);

            receiptRepository.save(receipt);
        }

        return "Donation successful!";
    }
}
