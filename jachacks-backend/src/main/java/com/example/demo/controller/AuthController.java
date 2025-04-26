package com.example.demo.controller;

import com.example.demo.DTO.UserDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/public/auth")
public class AuthController {

    @Autowired
    private JwtDecoder jwtDecoder;

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

    @GetMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");  // Extract token
            Jwt jwt = jwtDecoder.decode(token);  // Extract user info from token

            UserDTO user = UserService.registerUser(jwt);

            return ResponseEntity.ok(Map.of("message","User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message","Invalid token or registration failed"));
        }
    }
}
