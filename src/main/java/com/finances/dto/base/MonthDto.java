package com.finances.dto.base;


import com.finances.enums.MonthType;
import lombok.Builder;

@Builder
public record MonthDto(
        Long id,
        MonthType name,
        Integer order
) {
}