package com.dpjewellers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dpjewellers.model.entity.Product;
import com.dpjewellers.model.enums.Category;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
}