package com.finances.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.InputStreamResource;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDetailsDto {
    CategoryTypeDto category;
    List<PaymentDto> payments;
    // in the feature - https://www.baeldung.com/spring-controller-return-image-file
    InputStreamResource image;
}