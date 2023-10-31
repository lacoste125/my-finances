package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCategoryToMonthRequest {
    private Long categoryId;
    private Long monthId;
}