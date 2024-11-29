package com.finances.wrapper;

import com.finances.dto.YearCategoryDto;
import com.finances.entity.DisabledPayment;
import com.finances.entity.Payment;
import com.finances.entity.YearCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class YearCategoryDtoWrapper implements DtoWrapper<YearCategory, YearCategoryDto> {

    private final CategoryDtoWrapper categoryDtoWrapper;
    private final PaymentDtoWrapper paymentDtoWrapper;
    private final DisabledPaymentDtoWrapper disabledPaymentDtoWrapper;

    @Override
    public YearCategoryDto mapToDto(YearCategory dao) {
        return YearCategoryDto.builder()
                .id(dao.getId())
                .yearId(dao.getYear().getId())
                .categoryType(categoryDtoWrapper.mapToDto(dao.getCategory()))
                .payments(
                        dao.getPayments()
                                .stream()
                                .filter(Payment::isValid)
                                .map(paymentDtoWrapper::mapToDto)
                                .collect(Collectors.toList())
                )
                .disabledPayments(
                        dao.getDisabledPayments()
                                .stream()
                                .filter(DisabledPayment::isValid)
                                .map(disabledPaymentDtoWrapper::mapToDto)
                                .collect(Collectors.toList())
                )
                .build();
    }
}