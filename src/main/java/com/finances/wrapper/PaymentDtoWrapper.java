package com.finances.wrapper;

import com.finances.dto.base.PaymentDto;
import com.finances.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentDtoWrapper implements DtoWrapper<Payment, PaymentDto> {

    @Override
    public PaymentDto mapToDto(Payment dao) {
        return PaymentDto.builder()
                .id(dao.getId())
                .yearCategoryId(dao.getYearCategory().getId())
                .year(dao.getYearCategory().getYear().getYearNumber())
                .month(dao.getMonth().getName())
                .amount(dao.getAmount())
                .date(dao.getDate())
                .comment(dao.getComment())
                .valid(dao.isValid())
                .build();
    }
}