package com.example.demo.repository;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserInterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInterestRepository extends JpaRepository<UserInterestEntity, Long> {
    // Custom query to find all interests of a user
    List<UserInterestEntity> findByUser(UserEntity user);

    void deleteByUser(UserEntity user);
}
