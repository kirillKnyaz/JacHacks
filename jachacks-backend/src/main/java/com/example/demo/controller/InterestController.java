package com.example.demo.controller;

import com.example.demo.entity.InterestEntity;
import com.example.demo.repository.InterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/interests")
public class InterestController {

    @Autowired
    private InterestRepository interestRepository;

    @GetMapping
    public ResponseEntity<List<InterestEntity>> getAllInterests() {
        List<InterestEntity> interests = interestRepository.findAll();
        return ResponseEntity.ok(interests);
    }
}
