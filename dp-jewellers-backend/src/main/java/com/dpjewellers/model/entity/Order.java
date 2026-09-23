package com.dpjewellers.model.entity;

import java.time.LocalDateTime;

import com.dpjewellers.model.enums.OrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "user_id")
    private UserInfo user;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.PLACED;

    private LocalDateTime createdAt;
    
    // --- KOTHA 2 LINES ADD CHEY ---
    @Column(columnDefinition = "TEXT")
    private String shippingAddress; // "FullName, Phone, Address, City, State, Pincode"

    private String paymentMethod; // COD

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if(paymentMethod == null) paymentMethod = "COD";
    }
}