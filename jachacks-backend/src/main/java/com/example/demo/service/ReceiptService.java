package com.example.demo.service;

import com.example.demo.DTO.ReceiptDTO;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    // Get all receipts for a specific user
    public List<ReceiptDTO> getReceiptsByUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ReceiptEntity> receipts = receiptRepository.findByUser(user);

        // Convert ReceiptEntities to ReceiptDTOs for the response
        return receipts.stream()
                .map(receipt -> new ReceiptDTO(
                        receipt.getUser().getName(),
                        receipt.getOrganization().getName(),
                        receipt.getAmount()))
                .collect(Collectors.toList());
    }

    // Get all receipts for a specific organization
    public List<ReceiptDTO> getReceiptsByOrganization(Long organizationId) {
        OrganizationEntity organization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        List<ReceiptEntity> receipts = receiptRepository.findByOrganizationId(organization);

        // Convert ReceiptEntities to ReceiptDTOs for the response
        return receipts.stream()
                .map(receipt -> new ReceiptDTO(
                        receipt.getUser().getName(),
                        receipt.getOrganization().getName(),
                        receipt.getAmount()))
                .collect(Collectors.toList());
    }
}
