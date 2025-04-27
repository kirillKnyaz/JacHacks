package com.example.demo.DTO;

import lombok.*;

import java.math.BigDecimal;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptDTO {

    private String userName;
    private String organizationName;
    private BigDecimal amount;
}
