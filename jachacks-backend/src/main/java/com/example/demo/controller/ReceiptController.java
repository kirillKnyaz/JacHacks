package com.example.demo.controller;

import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.service.UserService;
import com.example.demo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrganizationService organizationService;

    @GetMapping("/user/{userId}")
    public List<ReceiptEntity> getReceiptsByUser(@PathVariable Long userId) {
        UserEntity user = userService.getUserById(userId);
        return receiptRepository.findByUser(user);
    }

    @GetMapping("/organization/{organizationId}")
    public List<ReceiptEntity> getReceiptsByOrganization(@PathVariable Long organizationId) {
        OrganizationEntity organization = organizationService.getOrganizationById(organizationId);
        return receiptRepository.findByOrganizationId(organization);
    }
}
