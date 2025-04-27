package com.example.demo.controller;

import com.example.demo.DTO.OrgRequest;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.OrganizationService;
import com.example.demo.service.UserOrganizationService;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-organization")
public class UserOrganizationController {

    private UserOrganizationService userOrganizationService;
    private OrganizationService organizationService;

    public UserOrganizationController(UserOrganizationService userOrganizationService,
                                       OrganizationService OrganizationService) {
        this.userOrganizationService = userOrganizationService;
        this.organizationService = OrganizationService;
    }

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

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> setOrganization(@RequestBody OrgRequest orgRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            String userId = jwt.getSubject();

            UserEntity user = UserService.getUserByAuth0Id(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            try {
                UserOrganizationService.addOrganization(user, orgRequest.getOrganizationId());
                return ResponseEntity.ok(Map.of("message", "Organization added successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
    }

    @PostMapping("/add/multiple")
    public ResponseEntity<Map<String, Object>> setMultipleOrganizations(
            @RequestBody List<Long> organizationIds) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            String userId = jwt.getSubject();

            UserEntity user = UserService.getUserByAuth0Id(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            try {
                userOrganizationService.setMultipleOrganizations(user, organizationIds);
                return ResponseEntity.ok(Map.of("message", "Organizations added successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Map<String, Object>> removeOrganization(@RequestBody OrgRequest orgRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            String userId = jwt.getSubject();

            UserEntity user = UserService.getUserByAuth0Id(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            try {
                userOrganizationService.removeOrganization(user, orgRequest.getOrganizationId());
                return ResponseEntity.ok(Map.of("message", "Organization removed successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
    }

    @GetMapping("/get/{userAuth0Id}")
    public ResponseEntity<Map<String, Object>> getUserOrganizations(@PathVariable String userAuth0Id) {
        try {
            List<OrganizationEntity> organizations = UserOrganizationService.getUserOrganizations(userAuth0Id);
            return ResponseEntity.ok(Map.of(
                    "organizations", organizations
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}