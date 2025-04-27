package com.example.demo.service;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserOrganizationEntity;
import com.example.demo.repository.UserOrganizationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserOrganizationService {

    private static UserOrganizationRepository userOrganizationRepository;

    public UserOrganizationService(UserOrganizationRepository userOrganizationRepository) {
        this.userOrganizationRepository = userOrganizationRepository;
    }

    @Transactional
    public void setMultipleOrganizations(UserEntity user, List<Long> organizationIds) {
        List<Long> notFoundIds = new ArrayList<>();

        userOrganizationRepository.deleteByUser(user);

        List<Long> limitedOrganizationIds = organizationIds.stream()
                .limit(5)
                .toList();

        for (Long organizationId : limitedOrganizationIds) {
            try {
                UserOrganizationEntity userOrganization = new UserOrganizationEntity();
                userOrganization.setUser(user);
                userOrganization.setOrganization(OrganizationService.getOrganizationById(organizationId));
                userOrganizationRepository.save(userOrganization);
            } catch (RuntimeException e) {
                notFoundIds.add(organizationId);
            }
        }

        if (!notFoundIds.isEmpty()) {
            throw new RuntimeException("Organizations not found: " + notFoundIds);
        }
    }

    public static List<OrganizationEntity> getUserOrganizations(String userAuth0Id) {
        UserEntity user = UserService.getUserByAuth0Id(userAuth0Id);
        List<UserOrganizationEntity> userOrganizationEntityList =  userOrganizationRepository.findByUser(user);

        List<OrganizationEntity> organizationEntityList = new ArrayList<>();
        for (UserOrganizationEntity userOrganization : userOrganizationEntityList) {
            organizationEntityList.add(userOrganization.getOrganization());
        }

        return organizationEntityList;
    }

    public static void addOrganization(UserEntity user, Long organizationId) {
        if (!userOrganizationRepository.findByUserAndOrganization(user, OrganizationService.getOrganizationById(organizationId)).isEmpty()) {
            System.out.println("User already has this organization");
            return;
        }

        UserOrganizationEntity userOrganization = new UserOrganizationEntity();
        userOrganization.setUser(user);
        userOrganization.setOrganization(OrganizationService.getOrganizationById(organizationId));
        userOrganizationRepository.save(userOrganization);
    }

    @Transactional
    public void removeOrganization(UserEntity user, Long organizationId) {
        List<UserOrganizationEntity> userOrganization = userOrganizationRepository.findByUserAndOrganization(user, OrganizationService.getOrganizationById(organizationId));
        userOrganizationRepository.deleteAll(userOrganization);
    }
}
