package com.finances.service;

import com.finances.entity.DisabledPayment;
import com.finances.entity.Month;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.NotFoundException;
import com.finances.repository.DisabledPaymentRepository;
import com.finances.request.TogglePaymentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DisabledPaymentService {

    private final DisabledPaymentRepository disabledPaymentRepository;
    private final MonthService monthService;
    private final YearCategoryService yearCategoryService;

    public DisabledPayment togglePayment(TogglePaymentRequest request, boolean expectedValue) throws NotFoundException {
        Month month = monthService.findByName(request.getMonthName());
        YearCategory yearCategory = yearCategoryService.findByYearCategoryId(request.getYearCategoryId());

        Optional<DisabledPayment> optionalDisabledPayment =
                disabledPaymentRepository.selectByMonthIdAndYearCategoryId(month.getId(), request.getYearCategoryId());

        return disabledPaymentRepository.save(
                optionalDisabledPayment.isPresent() ? optionalDisabledPayment.get()
                        .withComment(request.getComment())
                        .withValid(expectedValue) :
                        DisabledPayment.builder()
                                .month(month)
                                .yearCategory(yearCategory)
                                .comment(request.getComment())
                                .valid(expectedValue)
                                .build()
        );
    }

    public List<DisabledPayment> getDisabledPaymentsByYear(Integer year) {
        return disabledPaymentRepository.selectByYear(year);
    }
}