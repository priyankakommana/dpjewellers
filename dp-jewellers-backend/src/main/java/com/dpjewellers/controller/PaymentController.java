package com.dpjewellers.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.service.PaymentService;
import com.razorpay.Order;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired private PaymentService paymentService;
    @Value("${razorpay.key_id}") private String keyId;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            // THIS IS THE FIX - use Number, not String or direct int cast
            Object amtObj = data.get("amount");
            int amount = 0;
            if (amtObj instanceof Number) {
                amount = ((Number) amtObj).intValue();
            } else if (amtObj instanceof String) {
                amount = Integer.parseInt((String) amtObj);
            }

            String receipt = "dp_" + System.currentTimeMillis();
            Order order = paymentService.createOrder(amount, receipt);
            
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id").toString());
            response.put("amount", order.get("amount").toString());
            response.put("keyId", keyId);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Something went wrong: " + e.getMessage()
            ));
        }
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String,String> data) {
        // TODO: verify signature + save order with address
        System.out.println("Payment verified: " + data.get("razorpay_payment_id"));
        return ResponseEntity.ok(Map.of("message","Payment Verified"));
    }
}
