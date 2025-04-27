package com.example.demo.controller;

import com.example.demo.entity.UserInterestEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.InterestEntity;
//import com.example.demo.service.UserInterestService;
//import com.example.demo.service.UserService;
//import com.example.demo.service.InterestService;
import com.example.demo.service.InterestService;
import com.example.demo.service.UserInterestService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-interests")
public class UserInterestController {

    @Autowired
    private UserInterestService userInterestService;

    @Autowired
    private UserService userService;

    @Autowired
    private InterestService interestService;

    // Add a user's interest
    @PostMapping("/add/multiple")
    public ResponseEntity<Map<String, String>> addUserInterest(@RequestBody List<Long> interestIds) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            String userId = jwt.getSubject();

            UserEntity user = UserService.getUserByAuth0Id(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            try {
                userInterestService.addUserInterests(user, interestIds);
                return ResponseEntity.ok(Map.of("message", "Interests added successfully"));
            } catch (RuntimeException e) {
                return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<Map<String, Object>> getUserInterests(@PathVariable("userId") String userId) {
        try {
            List<InterestEntity> userInterests = UserInterestService.getUserInterests(userId);
            if (userInterests.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "No interests found for this user"));
            }
            return ResponseEntity.ok(Map.of("interests", userInterests));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
