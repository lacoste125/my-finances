package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddNewCategoryToYearRequest {
    private String name;
    private String deadline;
    private Integer yearNumber;
}