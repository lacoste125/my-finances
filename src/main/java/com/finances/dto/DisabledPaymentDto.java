package com.finances.dto;

import com.finances.entity.DisabledPayment;
import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisabledPaymentDto {

    private Long id;
    private MonthType month;
    private Long yearCategoryId;
    private boolean valid;

    public static DisabledPaymentDto fromDao(DisabledPayment dao) {
        return new DisabledPaymentDto(
                dao.getId(),
                dao.getMonth().getName(),
                dao.getYearCategory().getId(),
                dao.isValid()
        );
    }
}