package com.finances.service;

import com.finances.dto.CategoryDetailsDto;
import com.finances.dto.CategoryTypeDto;
import com.finances.dto.PaymentDto;
import com.finances.entity.Category;
import com.finances.entity.Month;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.repository.PaymentRepository;
import com.finances.request.AddPaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final YearCategoryService yearCategoryService;
    private final MonthService monthService;
    private final CategoryService categoryService;

    @Autowired
    public PaymentService(
            PaymentRepository paymentRepository,
            YearCategoryService yearCategoryService,
            MonthService monthService,
            CategoryService categoryService
    ) {
        this.paymentRepository = paymentRepository;
        this.yearCategoryService = yearCategoryService;
        this.monthService = monthService;
        this.categoryService = categoryService;
    }

    public PaymentDto addPayment(AddPaymentRequest requestBody)
            throws YearCategoryNotFoundException, MonthNotFoundException, AmountIsEmptyException {

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
        Payment saved = paymentRepository.save(payment);

        return PaymentDto.fromDao(saved);
    }

    public CategoryDetailsDto getCategoryPayments(Long categoryId) throws CategoryNotFoundException {
        Category category = categoryService.findCategoryById(categoryId);

        List<PaymentDto> payments = paymentRepository.getCategoryPayments(categoryId)
                .stream()
                .map(PaymentDto::fromDao)
                .toList();

        CategoryDetailsDto categoryDetails = new CategoryDetailsDto();
        categoryDetails.setCategory(CategoryTypeDto.fromDao(category));
        categoryDetails.setPayments(payments);

        return categoryDetails;
    }
}