package com.dpjewellers.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartResponse {
    private Long cartId;
    private Long productId;
    private String productName;
    private Double price;
    private Integer quantity;
    private Double total;
}