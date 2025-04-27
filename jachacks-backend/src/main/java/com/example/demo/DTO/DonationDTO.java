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

    private Long userId;
    private List<Long> organizationId;
    private BigDecimal totalAmount;
}
