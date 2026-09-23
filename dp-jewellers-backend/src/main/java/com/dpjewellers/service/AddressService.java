package com.dpjewellers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dpjewellers.dto.AddressDTO;
import com.dpjewellers.model.entity.Address;
import com.dpjewellers.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public List<AddressDTO> getMyAddresses(String email) {
        return addressRepository.findByUserEmail(email).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public AddressDTO saveAddress(String email, AddressDTO dto) {
        Address addr = Address.builder()
                .userEmail(email)
                .fullName(dto.getFullName())
                .phone(dto.getPhone())
                .addressLine1(dto.getAddressLine1())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .isDefault(true)
                .build();
        return toDTO(addressRepository.save(addr));
    }

    public void deleteAddress(String email, Long id) {
        addressRepository.findByIdAndUserEmail(id, email)
                .ifPresent(addressRepository::delete);
    }

    private AddressDTO toDTO(Address a) {
        return AddressDTO.builder()
                .id(a.getId())
                .fullName(a.getFullName())
                .phone(a.getPhone())
                .addressLine1(a.getAddressLine1())
                .city(a.getCity())
                .state(a.getState())
                .pincode(a.getPincode())
                .isDefault(a.getIsDefault())
                .build();
    }
}
