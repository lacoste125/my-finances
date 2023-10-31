package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCategoryToYearRequest {
    private Long categoryId;
    private Long yearId;
}