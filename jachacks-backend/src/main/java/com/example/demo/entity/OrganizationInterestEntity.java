package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "organization_interests")
public class OrganizationInterestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "organization_id") // FK to organization table
    private OrganizationEntity organization;

    @ManyToOne
    @JoinColumn(name = "interest_id") // FK to interest table
    private InterestEntity interest;
}
