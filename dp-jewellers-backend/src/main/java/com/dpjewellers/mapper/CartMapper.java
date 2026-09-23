package com.dpjewellers.mapper;

import org.springframework.stereotype.Component;

import com.dpjewellers.dto.CartDTO;
import com.dpjewellers.model.entity.Cart;

@Component
public class CartMapper {

    public static CartDTO toDTO(Cart cart) {
        if (cart == null) return null;
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setQuantity(cart.getQuantity());
        if (cart.getProduct() != null) {
            dto.setProductId(cart.getProduct().getId());
            dto.setProductName(cart.getProduct().getName());
            dto.setPrice(cart.getProduct().getPrice());
            dto.setImageUrl(cart.getProduct().getImageUrl());
        }
        return dto;
    }
}
