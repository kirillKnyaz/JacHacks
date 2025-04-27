package com.example.demo.service;

import com.example.demo.DTO.UserDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        UserService.userRepository = userRepository;
    }

    public static UserDTO registerUser(Jwt jwt) {
        String userId = jwt.getSubject();
        String email = jwt.getClaimAsString("email");

        UserEntity user = userRepository.findByAuth0Id(userId).orElseGet(() -> {
            UserEntity newUser = new UserEntity();
            newUser.setAuth0Id(userId);
            newUser.setEmail(email);
            return userRepository.save(newUser);
        });

        return new UserDTO(user);
    }

    public static UserEntity getUserByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id).orElse(null);
    }
}
