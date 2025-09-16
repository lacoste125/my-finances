package com.finances.wrapper;

import com.finances.dto.CategoryDetailsDto;
import com.finances.entity.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class CategoryDetailsDtoWrapper implements DtoWrapper<List<Payment>, CategoryDetailsDto> {

    private final CategoryDtoWrapper categoryDtoWrapper;
    private final PaymentDtoWrapper paymentDtoWrapper;

    @SuppressWarnings("OptionalGetWithoutIsPresent")
    @Override
    public CategoryDetailsDto mapToDto(List<Payment> daos) {
        if (daos.isEmpty()) {
            return CategoryDetailsDto.builder()
                    .payments(List.of())
                    .build();
        }

        return CategoryDetailsDto.builder()
                .category(
                        categoryDtoWrapper.mapToDto(
                                daos.stream()
                                        .findFirst()
                                        .get()
                                        .getYearCategory()
                                        .getCategory()
                        )
                )
                .payments(paymentDtoWrapper.mapToDtos(daos))
                .build();
    }
}