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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public UserInterestEntity addUserInterest(@RequestBody List<Long> interestIds) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            String userId = jwt.getSubject();

            UserEntity user = UserService.getUserByAuth0Id(userId);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            

        }
    }
