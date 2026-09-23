package com.dpjewellers.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserEmail(String userEmail);
    Optional<Address> findByIdAndUserEmail(Long id, String userEmail);
}