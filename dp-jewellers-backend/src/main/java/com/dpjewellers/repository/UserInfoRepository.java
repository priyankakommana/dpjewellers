package com.dpjewellers.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByEmail(String email);
    boolean existsByEmail(String email);
}