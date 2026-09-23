package com.dpjewellers.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.dto.request.AddToCartRequest;
import com.dpjewellers.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CartController {

    @Autowired private CartService cartService;

    private String getEmail() {
        // Filter set chesina email ni SecurityContext nundi teesukovali
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping
    public ResponseEntity<?> getCart() {
        return ResponseEntity.ok(cartService.getCart(getEmail()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> body) {
        AddToCartRequest req = new AddToCartRequest();
        req.setProductId(Long.valueOf(body.get("productId").toString()));
        Object q = body.get("quantity");
        req.setQuantity(q != null ? Integer.parseInt(q.toString()) : 1);
        return ResponseEntity.ok(cartService.addToCart(getEmail(), req));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> remove(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        cartService.clearCart(getEmail());
        return ResponseEntity.ok(Map.of("success", true));
    }
}