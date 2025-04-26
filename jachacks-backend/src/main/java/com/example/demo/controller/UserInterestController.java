package com.example.demo.controller;

import com.example.demo.entity.UserInterestEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.InterestEntity;
//import com.example.demo.service.UserInterestService;
//import com.example.demo.service.UserService;
//import com.example.demo.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-interests")
public class UserInterestController {

//    @Autowired
//    private UserInterestService userInterestService;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private InterestService interestService;

//    // Add a user's interest
//    @PostMapping("/add")
//    public UserInterestEntity addUserInterest(@RequestParam Long userId, @RequestParam Long interestId) {
//        UserEntity user = userService.getUserById(userId);
//                List<InterestEntity> interests = interestService.getInterestsByNames(interestNames);
//        return userInterestService.addUserInterest(user, interests);
//    }

//    // Get all interests of a user
//    @GetMapping("/user/{userId}")
//    public List<UserInterestEntity> getUserInterests(@PathVariable Long userId) {
//        UserEntity user = userService.getUserById(userId);
//        return userInterestService.getUserInterests(user);
//    }
}
