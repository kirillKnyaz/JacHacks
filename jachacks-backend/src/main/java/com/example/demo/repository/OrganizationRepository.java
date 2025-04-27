package com.example.demo.repository;

import com.example.demo.entity.OrganizationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends JpaRepository<OrganizationEntity, Long> {

    OrganizationEntity findByName(String name);

    // Custom query to find an organization by the amount of matching interests between the user and the organization

    @Query(value = """
    SELECT o.*
    FROM organizations o
    JOIN organization_interests oi ON o.id = oi.organization_id
    JOIN user_interests ui ON oi.interest_id = ui.interest_id
    WHERE ui.user_id = :userId
    GROUP BY o.id
    ORDER BY COUNT(oi.interest_id) DESC
    LIMIT 5
    """, nativeQuery = true)
    List<OrganizationEntity> findTop5MatchingOrganizationsByUser(@Param("userId") Long userId);

}
