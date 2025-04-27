package com.example.demo.controller;

import com.example.demo.DTO.ReceiptDTO;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.service.ReceiptService;
import com.example.demo.service.UserService;
import com.example.demo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrganizationService organizationService;

    @GetMapping("/user/{userAuth0Id}")
    public ResponseEntity<Map<String, Object>> getReceiptsByUser(@PathVariable String userAuth0Id) {
        UserEntity user = UserService.getUserByAuth0Id(userAuth0Id);

        try {
            List<ReceiptDTO> receiptDTOS = ReceiptService.getReceiptsByUser(user.getAuth0Id());
            return ResponseEntity.ok(Map.of("receipts", receiptDTOS));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/organization/{organizationId}")
    public List<ReceiptEntity> getReceiptsByOrganization(@PathVariable Long organizationId) {
        OrganizationEntity organization = organizationService.getOrganizationById(organizationId);
        return receiptRepository.findByOrganizationId(organization);
    }
}
