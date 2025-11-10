package com.finances.service;

import com.finances.entity.Category;
import com.finances.entity.Month;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.repository.PaymentRepository;
import com.finances.request.AddPaymentRequest;
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

    public Payment addPayment(AddPaymentRequest requestBody) throws NotFoundException, AmountIsEmptyException {
        Double amount = requestBody.amount();
        if (amount == null || amount == 0) {
            throw new AmountIsEmptyException(amount);
        }

        YearCategory yearCategory = yearCategoryService.findByYearCategoryId(requestBody.yearCategoryId());
        Month month = monthService.findByName(requestBody.monthName());

        return paymentRepository.save(
                Payment.builder()
                        .yearCategory(yearCategory)
                        .month(month)
                        .amount(amount)
                        .date(requestBody.date())
                        .comment(requestBody.comment())
                        .build()
        );
    }

    public List<Payment> getPaymentsByYearCategoryId(Long categoryId) throws CategoryNotFoundException {
        Category category = categoryService.findCategoryById(categoryId);

        return paymentRepository.getCategoryPayments(category);
    }
}