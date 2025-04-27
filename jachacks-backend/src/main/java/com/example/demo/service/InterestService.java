package com.example.demo.service;

import com.example.demo.entity.InterestEntity;
import com.example.demo.repository.InterestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestService {

    private static InterestRepository interestRepository;

    public InterestService(InterestRepository interestRepository) {
        this.interestRepository = interestRepository;
    }

    public static List<InterestEntity> getAllInterests() {
        return interestRepository.findAll();
    }

    public static InterestEntity getInterestById(Long id) {
        InterestEntity interest =  interestRepository.findById(id).orElse(null);

        if (interest == null) {
            throw new RuntimeException("Interest not found");
        }

        return interest;
    }
}
