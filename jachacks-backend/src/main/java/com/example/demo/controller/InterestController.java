package com.example.demo.controller;

import com.example.demo.entity.InterestEntity;
import com.example.demo.repository.InterestRepository;
import com.example.demo.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/interests")
public class InterestController {

    @GetMapping("/all")
    public ResponseEntity<List<InterestEntity>> getAllInterests() {
        List<InterestEntity> interests = InterestService.getAllInterests();
        return ResponseEntity.ok(interests);
    }
}
