package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/public/auth")
public class AuthController {

    @RequestMapping("/hello")
    public ResponseEntity<Map<String, Object>> hello() {
        return ResponseEntity.ok(Map.of(
                "message", "Hello from the public endpoint!",
                "status", "success"
        ));
    }

    @RequestMapping("/login")
    public String login() {
        return "Login endpoint";
    }

    @RequestMapping("/register")
    public String register() {
        return "Register endpoint";
    }
}
