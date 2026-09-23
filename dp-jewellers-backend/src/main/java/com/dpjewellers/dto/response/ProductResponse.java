package com.dpjewellers.dto.response;

import java.util.List;

import com.dpjewellers.dto.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse {
    private List<ProductDTO> products;
    private long totalCount;
}
