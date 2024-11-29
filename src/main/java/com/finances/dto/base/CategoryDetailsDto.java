package com.finances.dto.base;

import lombok.Builder;
import org.springframework.core.io.InputStreamResource;

import java.util.List;

@Builder
public record CategoryDetailsDto(
        CategoryDto category,
        List<PaymentDto> payments,
        // in the feature - https://www.baeldung.com/spring-controller-return-image-file
        InputStreamResource image
) {
}