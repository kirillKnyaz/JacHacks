package com.example.demo.service;

import com.example.demo.entity.InterestEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserInterestEntity;
import com.example.demo.repository.UserInterestRepository;
import jakarta.transaction.Transactional;
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
    @Transactional
    public void addUserInterests(UserEntity user, List<Long> interestIds) {
        List<Long> notFoundIds = new ArrayList<>();

        userInterestRepository.deleteByUser(user);

        List<Long> limitedInterestIds = interestIds.stream()
                .limit(5)
                .toList();

        for (Long interestId : limitedInterestIds) {
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

    public static List<InterestEntity> getUserInterests(String userAuth0Id) {
        UserEntity user = UserService.getUserByAuth0Id(userAuth0Id);
        List<InterestEntity> userInterests = new ArrayList<>();
        for ( UserInterestEntity interest : userInterestRepository.findByUser(user)) {
            userInterests.add(interest.getInterest());
        }
        return userInterests;
    }
}
