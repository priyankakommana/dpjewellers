package com.dpjewellers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dpjewellers.dto.OrderDTO;
import com.dpjewellers.model.entity.Cart;
import com.dpjewellers.model.entity.Order;
import com.dpjewellers.model.entity.OrderItem;
import com.dpjewellers.model.entity.Product;
import com.dpjewellers.model.entity.UserInfo;
import com.dpjewellers.model.enums.OrderStatus;
import com.dpjewellers.repository.CartRepository;
import com.dpjewellers.repository.OrderItemRepository;
import com.dpjewellers.repository.OrderRepository;
import com.dpjewellers.repository.ProductRepository;
import com.dpjewellers.repository.UserInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserInfoRepository userRepository;

    @Transactional
    public OrderDTO placeOrder(String email, String shippingAddress) { // address parameter add
    UserInfo user = userRepository.findByEmail(email).orElseThrow();
    List<Cart> cartItems = cartRepository.findByUserId(user.getId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = 0.0;
        for (Cart c : cartItems) {
            Product p = c.getProduct();
            if (p.getStock() < c.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + p.getName());
            }
        }

        Order order = Order.builder()
                .user(user)
                .totalAmount(0.0)
                .status(OrderStatus.PLACED)
                .shippingAddress(shippingAddress) // NEW
                .paymentMethod("COD")
                .build();
        Order saved = orderRepository.save(order);

        for (Cart c : cartItems) {
            Product p = c.getProduct();
            p.setStock(p.getStock() - c.getQuantity());
            productRepository.save(p);

            double itemTotal = p.getPrice() * c.getQuantity();
            total = total + itemTotal;

            OrderItem item = OrderItem.builder()
                    .order(saved)
                    .product(p)
                    .quantity(c.getQuantity())
                    .price(p.getPrice())
                    .build();
            orderItemRepository.save(item);
        }

        saved.setTotalAmount(total);
        saved = orderRepository.save(saved);
        cartRepository.deleteAll(cartItems);

        return toDTO(saved);
    }

    public List<OrderDTO> getUserOrders(String email) {
        UserInfo user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserId(user.getId()).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    private OrderDTO toDTO(Order o) {
    OrderDTO dto = new OrderDTO();
    dto.setId(o.getId());
    dto.setEmail(o.getUser() != null ? o.getUser().getEmail() : null);
    dto.setTotalAmount(o.getTotalAmount());
    dto.setStatus(o.getStatus() != null ? o.getStatus().name() : null);
    dto.setCreatedAt(o.getCreatedAt());
    dto.setShippingAddress(o.getShippingAddress()); // ADD THIS
    dto.setPaymentMethod(o.getPaymentMethod()); // ADD THIS

    List<OrderItem> items = orderItemRepository.findByOrderId(o.getId());
    List<OrderDTO.OrderItemDTO> itemDTOs = items.stream().map(i -> {
        OrderDTO.OrderItemDTO idto = new OrderDTO.OrderItemDTO();
        idto.setProductId(i.getProduct().getId());
        idto.setProductName(i.getProduct().getName());
        idto.setQuantity(i.getQuantity());
        idto.setPrice(i.getPrice());
        return idto;
    }).collect(Collectors.toList());
    dto.setItems(itemDTOs);
    return dto;
}
}