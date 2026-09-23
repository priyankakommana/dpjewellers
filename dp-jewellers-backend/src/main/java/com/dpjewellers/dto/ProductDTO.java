package com.dpjewellers.dto;

import com.dpjewellers.model.enums.Category;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Category category;
    private String subCategory;
    private String imageUrl;
    private Double weight;
    private Integer stock;
}