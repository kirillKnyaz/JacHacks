package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_interests")
public class UserInterestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id") // FK to user table
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "interest_id") // FK to interest table
    private InterestEntity interest;
}
