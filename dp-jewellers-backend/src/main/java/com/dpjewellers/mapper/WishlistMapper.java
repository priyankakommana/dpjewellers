package com.dpjewellers.mapper;
import com.dpjewellers.dto.WishlistDTO;
import com.dpjewellers.model.entity.Wishlist;

public class WishlistMapper {
    public static WishlistDTO toDTO(Wishlist wishlist) {
        if (wishlist.getProduct() == null) {
            return null; // orphan item skip
        }
        return new WishlistDTO(
            wishlist.getId(),
            wishlist.getProduct().getId(),
            wishlist.getProduct().getName(),
            wishlist.getProduct().getPrice(),
            wishlist.getProduct().getImageUrl()
        );
    }
}