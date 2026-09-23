package com.dpjewellers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dpjewellers.dto.request.LoginRequest;
import com.dpjewellers.dto.request.RegisterRequest;
import com.dpjewellers.model.entity.UserInfo;
import com.dpjewellers.model.enums.Role;
import com.dpjewellers.repository.UserInfoRepository;
import com.dpjewellers.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserInfoRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(LoginRequest request) {
        UserInfo user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        String dbPassword = user.getPassword();
        String inputPassword = request.getPassword();
        boolean isMatch = false;

        if (dbPassword == null) {
            throw new RuntimeException("Invalid credentials");
        }

        // DB lo BCrypt ayithe
        if (dbPassword.startsWith("$2a$") || dbPassword.startsWith("$2b$")) {
            isMatch = passwordEncoder.matches(inputPassword, dbPassword);
        } else {
            // DB lo plain text unte - nee old data kosam
            isMatch = dbPassword.equals(inputPassword);
            if (isMatch) {
                // Auto upgrade to BCrypt - next time nundi secure
                user.setPassword(passwordEncoder.encode(inputPassword));
                userRepository.save(user);
            }
        }

        if (!isMatch) {
            throw new RuntimeException("Invalid credentials");
        }

        // Nee JwtUtil ki 2 args kavali -> email, role string
        String roleName = user.getRole() != null ? user.getRole().name() : Role.USER.name();
        return jwtUtil.generateToken(user.getEmail(), roleName);
    }

    public UserInfo register(RegisterRequest request) {
        UserInfo user = UserInfo.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }
}