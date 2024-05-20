package com.finances.dto.base;

import com.finances.entity.DisabledPayment;
import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DisabledPaymentDto {

    private Long id;
    private MonthType month;
    private Long yearCategoryId;
    private String comment;
    private boolean valid;

    public static DisabledPaymentDto fromDao(DisabledPayment dao) {
        return DisabledPaymentDto.builder()
                .id(dao.getId())
                .month(dao.getMonth().getName())
                .yearCategoryId(dao.getYearCategory().getId())
                .comment(dao.getComment())
                .valid(dao.isValid())
                .build();
    }
}