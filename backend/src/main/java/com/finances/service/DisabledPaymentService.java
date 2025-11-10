package com.finances.service;

import com.finances.entity.DisabledPayment;
import com.finances.entity.Month;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.NotFoundException;
import com.finances.repository.DisabledPaymentRepository;
import com.finances.request.TogglePaymentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DisabledPaymentService {

    private final DisabledPaymentRepository disabledPaymentRepository;
    private final MonthService monthService;
    private final YearCategoryService yearCategoryService;

    public DisabledPayment togglePayment(TogglePaymentRequest request, boolean expectedValue) throws NotFoundException {
        Month month = monthService.findByName(request.monthName());
        YearCategory yearCategory = yearCategoryService.findByYearCategoryId(request.yearCategoryId());

        DisabledPayment payment = disabledPaymentRepository.selectByMonthIdAndYearCategoryId(month.getId(), request.yearCategoryId())
                .map(p -> {
                    p.setComment(request.comment());
                    p.setValid(expectedValue);

                    return p;
                })
                .orElseGet(
                        () -> DisabledPayment.builder()
                                .month(month)
                                .yearCategory(yearCategory)
                                .comment(request.comment())
                                .valid(expectedValue)
                                .build()
                );

        return disabledPaymentRepository.save(payment);
    }
}