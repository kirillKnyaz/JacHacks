package com.example.demo.DTO;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DonationDTO {

    private String userAuth0Id;
    private BigDecimal totalAmount;
}
