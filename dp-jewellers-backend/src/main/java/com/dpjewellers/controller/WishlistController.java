package com.dpjewellers.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.dto.WishlistDTO;
import com.dpjewellers.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    private final WishlistService wishlistService;
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    private String getEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString(); // fallback
        }
    }

    @GetMapping
    public ResponseEntity<List<WishlistDTO>> getWishlist() {
        String email = getEmail();
        System.out.println("WISHLIST FETCH FOR: " + email);
        return ResponseEntity.ok(wishlistService.getWishlist(email));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Map<String, Object> body) {
        String email = getEmail();
        Long productId = Long.valueOf(body.get("productId").toString());
        System.out.println("WISHLIST ADD: " + email + " -> " + productId);
        wishlistService.addToWishlist(email, productId);
        return ResponseEntity.ok(Map.of("message", "Added"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        String email = getEmail();
        wishlistService.removeFromWishlist(email, id);
        return ResponseEntity.ok(Map.of("message", "Removed"));
    }
}