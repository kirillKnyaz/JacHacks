package com.example.demo.service;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    private static OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public static List<OrganizationEntity> getTopMatchingOrganizations(String userAuth0Id){
        UserEntity user = UserService.getUserByAuth0Id(userAuth0Id);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return organizationRepository.findTop5MatchingOrganizationsByUser(user.getId());
    }
}
