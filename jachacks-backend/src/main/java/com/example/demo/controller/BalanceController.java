package com.example.demo.controller;

import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    private UserService userService;

    // Deposit money into user account
    @PostMapping("/deposit")
    public String depositBalance(@RequestParam Long userId, @RequestParam BigDecimal amount) {
        userService.depositBalance(userId, amount);
        return "Deposit successful!";
    }

    // Deposit money into user account
    @PostMapping("/donate")
    public String donateBalance(@RequestParam Long userId, @RequestParam Long organizationId , @RequestParam BigDecimal amount) {
        userService.donateBalance(userId,organizationId, amount);
        return "Donate successful!";
    }

    // Get current balance
    @GetMapping("/{userId}")
    public BigDecimal getBalance(@PathVariable Long userId) {
        UserEntity user = userService.getUserById(userId);
        return user.getBalance();
    }
}
