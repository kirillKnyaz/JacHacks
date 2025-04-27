package com.example.demo.service;

import com.example.demo.DTO.DonationDTO;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class BalanceService {

    private static ReceiptRepository receiptRepository;

    public BalanceService(ReceiptRepository receiptRepository) {
        BalanceService.receiptRepository = receiptRepository;
    }

    public static void donate(DonationDTO donationDTO) {
        List<OrganizationEntity> userOrganizations = UserOrganizationService.getUserOrganizations(donationDTO.getUserAuth0Id());

        BigDecimal totalAmount = donationDTO.getTotalAmount();
        BigDecimal splitAmount = totalAmount.divide(
                BigDecimal.valueOf(userOrganizations.size()),
                2, RoundingMode.HALF_UP
        );

        for (OrganizationEntity organization : userOrganizations) {
            ReceiptEntity receipt = new ReceiptEntity();
            receipt.setUser(UserService.getUserByAuth0Id(donationDTO.getUserAuth0Id()));
            receipt.setOrganization(organization);
            receipt.setAmount(splitAmount);
            receipt.setTimestamp(LocalDateTime.now());
            // Save the receipt to the database
            receiptRepository.save(receipt);
        }
    }
}
