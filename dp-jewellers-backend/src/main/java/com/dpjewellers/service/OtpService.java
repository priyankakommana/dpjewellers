package com.dpjewellers.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dpjewellers.model.entity.Otp;
import com.dpjewellers.repository.OtpRepository;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepo;

    // @Autowired
    // private JavaMailSender mailSender;

    // public String generateAndSend(String email, String purpose) {
    //     String code = String.valueOf((int)(Math.random()*900000)+100000);
    //     Otp otp = new Otp();
    //     otp.setEmail(email);
    //     otp.setCode(code);
    //     otp.setExpiry(LocalDateTime.now().plusMinutes(5));
    //     otpRepo.save(otp);

    //     SimpleMailMessage msg = new SimpleMailMessage();
    //     msg.setTo(email);
    //     msg.setSubject("DP Jewellers - Your OTP is " + code);
    //     msg.setText("Your " + purpose + " OTP is: " + code + "\nValid for 5 mins.\n\n- DP Jewellers");
    //     mailSender.send(msg);

    //     return code;
    // }
    @Autowired(required = false)
private JavaMailSender mailSender; // required=false

public String generateAndSend(String email, String purpose) {
  String code = String.valueOf((int)(Math.random()*900000)+100000);
  Otp otp = new Otp();
  otp.setEmail(email);
  otp.setCode(code);
  otp.setExpiry(LocalDateTime.now().plusMinutes(5));
  otpRepo.save(otp);

  System.out.println("====== OTP FOR " + email + " IS: " + code + " ======");

  if(mailSender != null) {
    try {
      SimpleMailMessage msg = new SimpleMailMessage();
      msg.setFrom("priyankakommana05@gmail.com");
      msg.setTo(email);
      msg.setSubject("DP Jewellers OTP: " + code);
      msg.setText("Your OTP: " + code);
      mailSender.send(msg);
    } catch(Exception e){
        System.out.println("===== MAIL ERROR DETAILS =====");
    e.printStackTrace();
    System.out.println("==============================");
    //   System.out.println("Mail failed, but OTP printed above");
    }
  }
  return code;
}

    // public boolean verify(String email, String code) {
    //     Otp otp = otpRepo.findTopByEmailOrderByExpiryDesc(email);
    //     if(otp == null || otp.getExpiry().isBefore(LocalDateTime.now())) return false;
    //     return otp.getCode().equals(code);
    // }
    public boolean verify(String email, String code) {
    Optional<Otp> latest = otpRepo.findTopByEmailOrderByExpiryDesc(email);
    if(latest.isEmpty()) return false;
    Otp otp = latest.get();
    if(otp.getExpiry().isBefore(LocalDateTime.now())) return false;
    if(!otp.getCode().equals(code)) return false;
    
    // OTP correct -> delete it
    otpRepo.delete(otp);
    return true;
}
}