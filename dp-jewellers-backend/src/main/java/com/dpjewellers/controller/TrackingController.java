package com.dpjewellers.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.service.OrderService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final OrderService orderService;

    @GetMapping("/order/{id}")
    public ResponseEntity<String> track(@PathVariable Long id) {
        // simple tracking - order status return chey
        return ResponseEntity.ok("Tracking for order " + id);
    }
}