package com.example.demo.repository;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserOrganizationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOrganizationRepository extends JpaRepository<UserOrganizationEntity, Long> {

    List<UserOrganizationEntity> findByUser(UserEntity userId);

    void deleteByUser(UserEntity userId);

    List<UserOrganizationEntity> findByUserAndOrganization(UserEntity user, OrganizationEntity organization);

}
