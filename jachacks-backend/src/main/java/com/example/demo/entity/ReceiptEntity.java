package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "receipts")
public class ReceiptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private OrganizationEntity organization;

    private BigDecimal amount;

    private LocalDateTime timestamp;

    // Constructor
    public ReceiptEntity(UserEntity user, OrganizationEntity organization, BigDecimal amount) {
        this.user = user;
        this.organization = organization;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
    }

    // Default constructor needed for JPA
    public ReceiptEntity() {
    }
}
