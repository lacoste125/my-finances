package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.util.TableNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DatabaseBackupDto {

    @JsonProperty(value = TableNaming.CATEGORY)
    private List<CategoryBackupDto> categories;

    @JsonProperty(value = TableNaming.DISABLED_PAYMENTS)
    private List<DisabledPaymentsBackupDto> disabledPayments;

    @JsonProperty(value = TableNaming.MONTH)
    private List<MonthBackupDto> months;

    @JsonProperty(value = TableNaming.PAYMENTS)
    private List<PaymentsBackupDto> payments;

    @JsonProperty(value = TableNaming.YEAR)
    private List<YearBackupDto> years;

    @JsonProperty(value = TableNaming.YEAR_CATEGORY)
    private List<YearCategoryBackupDto> yearCategories;
}