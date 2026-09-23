package com.dpjewellers.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    // Otp findTopByEmailOrderByExpiryDesc(String email);
    Optional<Otp> findTopByEmailOrderByExpiryDesc(String email);
}