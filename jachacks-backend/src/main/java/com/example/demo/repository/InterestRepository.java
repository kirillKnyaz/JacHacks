package com.example.demo.repository;

import com.example.demo.entity.InterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<InterestEntity, Long> {
    // Find interests by their names
    List<InterestEntity> findByNameIn(List<String> names);
}
