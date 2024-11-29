package com.finances.wrapper;

import com.finances.dto.base.DisabledPaymentDto;
import com.finances.entity.DisabledPayment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DisabledPaymentDtoWrapper implements DtoWrapper<DisabledPayment, DisabledPaymentDto> {

    private final MonthDtoWrapper monthDtoWrapper;

    @Override
    public DisabledPaymentDto mapToDto(DisabledPayment dao) {
        return DisabledPaymentDto.builder()
                .id(dao.getId())
                .month(monthDtoWrapper.mapToDto(dao.getMonth()))
                .yearCategoryId(dao.getYearCategory().getId())
                .comment(dao.getComment())
                .valid(dao.isValid())
                .build();
    }
}