package com.dpjewellers.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private String email;
    private Double totalAmount;
    private String status;
    private LocalDateTime createdAt;
    
    // EE 2 LINES ADD CHESAV KADU - IVI MISSING VALLA ERROR VACHINDI
    private String shippingAddress;
    private String paymentMethod;

    private List<OrderItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {
        private Long productId;
        private String productName;
        private int quantity;
        private double price;
    }
}