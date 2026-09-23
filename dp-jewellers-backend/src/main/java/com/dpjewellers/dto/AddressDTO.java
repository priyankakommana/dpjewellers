package com.dpjewellers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private Long id;
    private String fullName;
    private String phone;
    private String addressLine1;
    private String city;
    private String state;
    private String pincode;
    private Boolean isDefault;
}