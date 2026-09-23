package com.dpjewellers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dpjewellers.dto.CartDTO;
import com.dpjewellers.dto.request.AddToCartRequest;
import com.dpjewellers.mapper.CartMapper;
import com.dpjewellers.model.entity.Cart;
import com.dpjewellers.model.entity.Product;
import com.dpjewellers.model.entity.UserInfo;
import com.dpjewellers.repository.CartRepository;
import com.dpjewellers.repository.ProductRepository;
import com.dpjewellers.repository.UserInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserInfoRepository userRepository;

    public CartDTO addToCart(String email, AddToCartRequest req) {
        UserInfo user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(user.getId()).stream()
                .filter(c -> c.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(Cart.builder().user(user).product(product).quantity(0).build());

        cart.setQuantity(cart.getQuantity() + req.getQuantity());
        return CartMapper.toDTO(cartRepository.save(cart));
    }

    public List<CartDTO> getCart(String email) {
        UserInfo user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUserId(user.getId()).stream()
                .map(CartMapper::toDTO).collect(Collectors.toList());
    }

    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public void clearCart(String email) {
        UserInfo user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartRepository.deleteAll(cartRepository.findByUserId(user.getId()));
    }
}