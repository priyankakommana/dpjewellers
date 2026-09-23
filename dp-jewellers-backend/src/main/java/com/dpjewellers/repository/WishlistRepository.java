package com.dpjewellers.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.dpjewellers.model.entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserEmail(String userEmail);
    
    Optional<Wishlist> findByUserEmailAndProduct_Id(String userEmail, Long productId);
    
    @Modifying
    @Transactional
    void deleteByUserEmailAndProduct_Id(String userEmail, Long productId);
    
    List<Wishlist> findByUserId(Long userId);
    
    @Modifying
    @Transactional
    void deleteByIdAndUserEmail(Long id, String userEmail);
}