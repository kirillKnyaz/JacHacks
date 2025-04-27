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
    private static ReceiptRepository receiptRepository;

    @Autowired
    private static UserRepository userRepository;

    @Autowired
    private static OrganizationRepository organizationRepository;


    public ReceiptService(ReceiptRepository receiptRepository, UserRepository userRepository, OrganizationRepository organizationRepository) {
        ReceiptService.receiptRepository = receiptRepository;
        ReceiptService.userRepository = userRepository;
        ReceiptService.organizationRepository = organizationRepository;
    }

    // Get all receipts for a specific user
    public static List<ReceiptDTO> getReceiptsByUser(String userId) {
        UserEntity user = UserService.getUserByAuth0Id(userId);

        List<ReceiptEntity> receipts = receiptRepository.findByUser(user);

        // Convert ReceiptEntities to ReceiptDTOs for the response
        return receipts.stream()
                .map(receipt -> new ReceiptDTO(receipt))
                .collect(Collectors.toList());
    }

    // Get all receipts for a specific organization
    public List<ReceiptDTO> getReceiptsByOrganization(Long organizationId) {
        OrganizationEntity organization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        List<ReceiptEntity> receipts = receiptRepository.findByOrganizationId(organization);

        // Convert ReceiptEntities to ReceiptDTOs for the response
        return receipts.stream()
                .map(ReceiptDTO::new)
                .collect(Collectors.toList());
    }
}
