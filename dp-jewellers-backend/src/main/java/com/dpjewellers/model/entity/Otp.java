// package com.dpjewellers.model.entity;

// import java.time.LocalDateTime;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.Id;

// @Entity
// public class Otp {
//  @Id @GeneratedValue
//  Long id;
//  String email;
//  String code; // 6 digit
//  LocalDateTime expiry;
//  boolean verified = false;
// }
package com.dpjewellers.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Otp {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String code;
    private LocalDateTime expiry;

    // getters setters
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getEmail(){return email;} public void setEmail(String email){this.email=email;}
    public String getCode(){return code;} public void setCode(String code){this.code=code;}
    public LocalDateTime getExpiry(){return expiry;} public void setExpiry(LocalDateTime expiry){this.expiry=expiry;}
}