package com.finances.service;

import com.finances.dto.base.CategoryDetailsDto;
import com.finances.dto.base.PaymentDto;
import com.finances.entity.Category;
import com.finances.entity.Month;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.repository.PaymentRepository;
import com.finances.request.AddPaymentRequest;
import com.finances.wrapper.CategoryDtoWrapper;
import com.finances.wrapper.PaymentDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final YearCategoryService yearCategoryService;
    private final MonthService monthService;
    private final CategoryService categoryService;
    private final CategoryDtoWrapper categoryDtoWrapper;
    private final PaymentDtoWrapper paymentDtoWrapper;

    public Payment addPayment(AddPaymentRequest requestBody) throws NotFoundException, AmountIsEmptyException {

        if (requestBody.getAmount() == null || requestBody.getAmount() == 0) {
            throw new AmountIsEmptyException(requestBody.getAmount());
        }

        YearCategory yearCategory = yearCategoryService.findByYearCategoryId(requestBody.getYearCategoryId());
        Month month = monthService.findByName(requestBody.getMonthName());

        Payment payment = new Payment();
        payment.setYearCategory(yearCategory);
        payment.setMonth(month);
        payment.setAmount(requestBody.getAmount());
        payment.setDate(requestBody.getDate());
        payment.setComment(requestBody.getComment());
        payment.setValid(true);

        return paymentRepository.save(payment);
    }

    public CategoryDetailsDto getCategoryPayments(Long categoryId) throws CategoryNotFoundException {
        Category category = categoryService.findCategoryById(categoryId);

        List<PaymentDto> payments = paymentRepository.getCategoryPayments(categoryId)
                .stream()
                .map(paymentDtoWrapper::mapToDto)
                .toList();

        return CategoryDetailsDto.builder()
                .category(categoryDtoWrapper.mapToDto(category))
                .payments(payments)
                .build();
    }
}