package com.dpjewellers.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.dto.OrderDTO;
import com.dpjewellers.service.OrderService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

//     @PostMapping("/place")
// public ResponseEntity<OrderDTO> placeOrder(Authentication auth, @RequestBody Map<String, String> body) {
//     String address = body.get("address"); // frontend nundi "John, 98765, Chanda Nagar..."
//     return ResponseEntity.ok(orderService.placeOrder(auth.getName(), address));
// }
@PostMapping("/place")
public ResponseEntity<OrderDTO> placeOrder(Authentication auth, @RequestBody Map<String,String> body) {
    String fullAddress = body.get("address"); // "Ravi, 9876543210, MIG 123, Hyderabad..."
    return ResponseEntity.ok(orderService.placeOrder(auth.getName(), fullAddress));
}

    @GetMapping("/my")
    public ResponseEntity<List<OrderDTO>> myOrders(Authentication auth) {
        return ResponseEntity.ok(orderService.getUserOrders(auth.getName()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDTO>> allOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}