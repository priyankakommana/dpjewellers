package com.dpjewellers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}