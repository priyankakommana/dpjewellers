package com.dpjewellers.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dpjewellers.dto.WishlistDTO;
import com.dpjewellers.mapper.WishlistMapper;
import com.dpjewellers.model.entity.Product;
import com.dpjewellers.model.entity.Wishlist;
import com.dpjewellers.repository.ProductRepository;
import com.dpjewellers.repository.WishlistRepository;
@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    // public List<WishlistDTO> getWishlist(String userEmail) {
    //     return wishlistRepository.findByUserEmail(userEmail)
    //             .stream()
    //             .map(WishlistMapper::toDTO)
    //             .toList();
    // }
    public List<WishlistDTO> getWishlist(String userEmail) {
    return wishlistRepository.findByUserEmail(userEmail)
            .stream()
            .map(WishlistMapper::toDTO)
            .filter(dto -> dto != null) // orphan skip
            .toList();
    }

    public void addToWishlist(String userEmail, Long productId) {
    if (wishlistRepository.findByUserEmailAndProduct_Id(userEmail, productId).isPresent()) {
        return;
    }
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    Wishlist wishlist = Wishlist.builder()
            .userEmail(userEmail)
            .product(product)
            .createdAt(java.time.LocalDateTime.now()) // ee line add chey
            .build();
    wishlistRepository.save(wishlist);
}

    @Transactional
    public void removeFromWishlist(String userEmail, Long wishlistId) {
        wishlistRepository.deleteByIdAndUserEmail(wishlistId, userEmail);
    }
}
