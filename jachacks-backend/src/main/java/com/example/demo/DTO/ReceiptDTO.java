package com.example.demo.DTO;

import com.example.demo.entity.ReceiptEntity;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptDTO {

    private String userName;
    private String organizationName;
    private BigDecimal amount;
    private LocalDateTime date;

    public ReceiptDTO(ReceiptEntity receipt) {
        this.userName = receipt.getUser().getName();
        this.organizationName = receipt.getOrganization().getName();
        this.amount = receipt.getAmount();
        this.date = receipt.getTimestamp();
    }
}

