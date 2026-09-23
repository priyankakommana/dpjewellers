package com.dpjewellers.mapper;

import org.springframework.stereotype.Component;

import com.dpjewellers.dto.ProductDTO;
import com.dpjewellers.model.entity.Product;

@Component
public class ProductMapper {

    public static ProductDTO toDTO(Product p) {
        if (p == null) return null;
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setCategory(p.getCategory());
        dto.setSubCategory(p.getSubCategory());
        dto.setImageUrl(p.getImageUrl());
        dto.setStock(p.getStock());
        return dto;
    }

    public static Product toEntity(ProductDTO dto) {
        if (dto == null) return null;
        Product p = new Product();
        p.setId(dto.getId());
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setCategory(dto.getCategory());
        p.setImageUrl(dto.getImageUrl());
        p.setStock(dto.getStock());
        return p;
    }
}