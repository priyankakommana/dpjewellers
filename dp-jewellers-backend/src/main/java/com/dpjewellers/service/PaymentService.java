package com.dpjewellers.service;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentService {
    @Value("${razorpay.key_id}") private String keyId;
    @Value("${razorpay.key_secret}") private String keySecret;

    public Order createOrder(int amount, String receipt) throws Exception {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // in paise
        options.put("currency", "INR");
        options.put("receipt", receipt);
        Order order = client.orders.create(options);
        return order;
    }
}