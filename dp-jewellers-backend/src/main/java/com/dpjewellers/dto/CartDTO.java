package com.dpjewellers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Double price;
    private Integer quantity;
    private String imageUrl;
}