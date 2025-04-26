package com.example.demo.DTO;

import com.example.demo.entity.UserEntity;
import lombok.Data;

@Data
public class UserDTO {

    private String authOId;
    private String email;

    public UserDTO(UserEntity userEntity) {
        this.authOId = userEntity.getAuth0Id();
        this.email = userEntity.getEmail();
    }

}
