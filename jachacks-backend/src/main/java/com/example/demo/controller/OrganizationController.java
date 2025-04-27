package com.example.demo.controller;

import com.example.demo.entity.OrganizationEntity;
import com.example.demo.repository.OrganizationRepository;
import com.example.demo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/public/organization") // All endpoints start with /organization
public class OrganizationController {

    @Autowired
    private OrganizationRepository organizationRepository;

    // Get top matching organizations for a user
    @GetMapping("/top-matching/{userAuth0Id}")
    public ResponseEntity<Map<String,Object>> getTopMatchingOrganizations(@PathVariable String userAuth0Id) {
        try {
            List<OrganizationEntity> organizations = OrganizationService.getTopMatchingOrganizations(userAuth0Id);
            return ResponseEntity.ok(Map.of(
                    "organizations", organizations
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create or update an organization
    @PostMapping
    public ResponseEntity<OrganizationEntity> createOrUpdateOrganization(@RequestBody OrganizationEntity organization) {
        OrganizationEntity savedOrganization = organizationRepository.save(organization);
        return new ResponseEntity<>(savedOrganization, HttpStatus.CREATED);
    }

    // Get all organizations
    @GetMapping
    public ResponseEntity<List<OrganizationEntity>> getAllOrganizations() {
        List<OrganizationEntity> organizations = organizationRepository.findAll();
        return ResponseEntity.ok(organizations);
    }

    // Get an organization by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrganizationEntity> getOrganizationById(@PathVariable Long id) {
        return organizationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Get organization by name
    @GetMapping("/name/{name}")
    public ResponseEntity<OrganizationEntity> getOrganizationByName(@PathVariable String name) {
        OrganizationEntity organization = organizationRepository.findByName(name);
        return organization != null ? ResponseEntity.ok(organization)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Get count of organizations
    @GetMapping("/count")
    public ResponseEntity<Long> getOrganizationsCount() {
        return ResponseEntity.ok(organizationRepository.count());
    }

    // Delete an organization
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(@PathVariable Long id) {
        if (organizationRepository.existsById(id)) {
            organizationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
