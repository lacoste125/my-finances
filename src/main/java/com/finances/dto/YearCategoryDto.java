package com.finances.dto;

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

    public static YearCategoryDto fromDao(YearCategory dao) {
        return new YearCategoryDto(
                dao.getId(),
                dao.getYear().getId(),
                CategoryTypeDto.fromDao(dao.getCategory()),
                dao.getPayments()
                        .stream()
                        .filter(Payment::isValid)
                        .map(PaymentDto::fromDao)
                        .collect(Collectors.toList())
        );
    }
}