package com.dpjewellers.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dpjewellers.dto.request.LoginRequest;
import com.dpjewellers.dto.request.RegisterRequest;
import com.dpjewellers.model.entity.UserInfo;
import com.dpjewellers.repository.UserInfoRepository;
import com.dpjewellers.service.AuthService;
import com.dpjewellers.service.OtpService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired private OtpService otpService;
    @Autowired private UserInfoRepository userInfoRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserInfo user = authService.register(request);
            Map<String, Object> res = new HashMap<>();
            res.put("message", "User registered successfully");
            res.put("email", user.getEmail());
            res.put("id", user.getId());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            Map<String, Object> res = new HashMap<>();
            res.put("token", token);
            res.put("email", request.getEmail());
            res.put("message", "Login successful");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        try {
            String newPassword = body.get("newPassword");
            if (newPassword == null || newPassword.length() < 4) {
                return ResponseEntity.badRequest().body(Map.of("error", "Password too short"));
            }
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            UserInfo user = userInfoRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            user.setPassword(passwordEncoder.encode(newPassword));
            userInfoRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Password Changed Successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String,String> body){
        otpService.generateAndSend(body.get("email"), "verification");
        return ResponseEntity.ok(Map.of("message","OTP sent"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String,String> body){
        boolean ok = otpService.verify(body.get("email"), body.get("code"));
        if(!ok) return ResponseEntity.badRequest().body(Map.of("error","Invalid/Expired OTP"));
        return ResponseEntity.ok(Map.of("message","Verified"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgot(@RequestBody Map<String,String> body){
        Optional<UserInfo> user = userInfoRepository.findByEmail(body.get("email"));
        if(user.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","User not found"));
        otpService.generateAndSend(body.get("email"), "password reset");
        return ResponseEntity.ok(Map.of("message","OTP sent"));
    }

    
    @PostMapping("/reset-password")
public ResponseEntity<?> reset(@RequestBody Map<String,String> body){
    String email = body.get("email") != null ? body.get("email").trim() : "";
    String otp = body.get("otp") != null ? body.get("otp").trim() : body.get("code") != null ? body.get("code").trim() : ""; // supports both otp & code
    String newPassword = body.get("newPassword");

    System.out.println("RESET DEBUG -> Email: " + email + " OTP/Code: " + otp);

    if(email.isEmpty() || otp.isEmpty() || newPassword == null){
        return ResponseEntity.badRequest().body(Map.of("error","Missing fields"));
    }

    if(!otpService.verify(email, otp)) {
        return ResponseEntity.badRequest().body(Map.of("error","Invalid or Expired OTP"));
    }
    
    UserInfo user = userInfoRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    user.setPassword(passwordEncoder.encode(newPassword));
    userInfoRepository.save(user);
    
    // delete used OTPs for security
    // otpRepository.deleteByEmail(email); // if you have this method
    
    return ResponseEntity.ok(Map.of("message","Password reset success"));
}
}
