package com.dpjewellers.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.dto.AddressDTO;
import com.dpjewellers.service.AddressService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/my")
    public ResponseEntity<List<AddressDTO>> myAddresses(Authentication auth) {
        return ResponseEntity.ok(addressService.getMyAddresses(auth.getName()));
    }

    @PostMapping("/save")
    public ResponseEntity<AddressDTO> saveAddress(Authentication auth, @RequestBody AddressDTO dto) {
        return ResponseEntity.ok(addressService.saveAddress(auth.getName(), dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(Authentication auth, @PathVariable Long id) {
        addressService.deleteAddress(auth.getName(), id);
        return ResponseEntity.ok().build();
    }
}