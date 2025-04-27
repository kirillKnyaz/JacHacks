package com.example.demo.service;

import com.example.demo.entity.InterestEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserInterestEntity;
import com.example.demo.repository.UserInterestRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserInterestService {

    private static UserInterestRepository userInterestRepository;

    public UserInterestService(UserInterestRepository userInterestRepository) {
        this.userInterestRepository = userInterestRepository;
    }

    // add multiple
    public static void addUserInterests(UserEntity user, List<Long> interestIds) {
        List<Long> notFoundIds = new ArrayList<>();
        for (Long interestId : interestIds) {
            try {
                UserInterestEntity userInterest = new UserInterestEntity();
                userInterest.setUser(user);
                userInterest.setInterest(InterestService.getInterestById(interestId));
                userInterestRepository.save(userInterest);
            } catch (RuntimeException e) {
                notFoundIds.add(interestId);
            }
        }

        if (!notFoundIds.isEmpty()) {
            throw new RuntimeException("Interests not found: " + notFoundIds);
        }
    }
}
