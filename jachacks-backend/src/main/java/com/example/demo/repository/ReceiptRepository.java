package com.example.demo.repository;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.ReceiptEntity;
import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<ReceiptEntity, Long> {
    // Find all receipts for a specific user to list all their donations
    List<ReceiptEntity> findByUser(UserEntity user);

    // Find all receipts for a specific organization to list all users who donated to them
    List<ReceiptEntity> findByOrganizationId(OrganizationEntity organization);
}
