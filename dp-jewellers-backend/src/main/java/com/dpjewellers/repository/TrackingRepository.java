package com.dpjewellers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.Tracking;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
    List<Tracking> findByOrderId(Long orderId);
}
