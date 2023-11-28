package com.finances.dto.base;

import com.finances.entity.DisabledPayment;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YearCategoryDto {
    private Long id;
    private Long yearId;
    private CategoryTypeDto categoryType;
    private List<PaymentDto> payments;
    private List<DisabledPaymentDto> disabledPayments;

    public static YearCategoryDto fromDao(YearCategory dao) {
        return new YearCategoryDto(
                dao.getId(),
                dao.getYear().getId(),
                CategoryTypeDto.fromDao(dao.getCategory()),
                dao.getPayments()
                        .stream()
                        .filter(Payment::isValid)
                        .map(PaymentDto::fromDao)
                        .collect(Collectors.toList()),
                dao.getDisabledPayments()
                        .stream()
                        .filter(DisabledPayment::isValid)
                        .map(DisabledPaymentDto::fromDao)
                        .collect(Collectors.toList())
        );
    }
}