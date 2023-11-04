package com.finances.service;

import com.finances.dto.PaymentDto;
import com.finances.entity.Month;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.repository.PaymentRepository;
import com.finances.request.AddPaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final YearCategoryService yearCategoryService;
    private final MonthService monthService;

    @Autowired
    public PaymentService(
            PaymentRepository paymentRepository,
            YearCategoryService yearCategoryService,
            MonthService monthService
    ) {
        this.paymentRepository = paymentRepository;
        this.yearCategoryService = yearCategoryService;
        this.monthService = monthService;
    }

    public PaymentDto addPayment(AddPaymentRequest requestBody) throws YearCategoryNotFoundException, MonthNotFoundException {
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
}