package com.example.demo.repository;

import com.example.demo.entity.UserInterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInterestRepository extends JpaRepository<UserInterestEntity, Long> {
}
