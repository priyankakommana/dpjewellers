package com.dpjewellers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dpjewellers.dto.ProductDTO;
import com.dpjewellers.mapper.ProductMapper;
import com.dpjewellers.model.entity.Product;
import com.dpjewellers.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAll() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toDTO).collect(Collectors.toList());
    }

    public ProductDTO getById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ProductMapper.toDTO(p);
    }

    public ProductDTO create(ProductDTO dto) {
        return ProductMapper.toDTO(productRepository.save(ProductMapper.toEntity(dto)));
    }

    public ProductDTO update(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Product updated = ProductMapper.toEntity(dto);
        updated.setId(existing.getId());
        return ProductMapper.toDTO(productRepository.save(updated));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getByCategory(String category) {
        return productRepository.findAll().stream()
 
        .filter(p -> p.getCategory() != null && p.getCategory().name().equalsIgnoreCase(category))
                        .map(ProductMapper::toDTO).collect(Collectors.toList());
            }
        }
