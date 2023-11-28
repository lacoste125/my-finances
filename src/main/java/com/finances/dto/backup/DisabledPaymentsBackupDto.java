package com.finances.dto.backup;

import com.finances.entity.DisabledPayment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisabledPaymentsBackupDto {
    private Long id;
    private Long month_id;
    private Long year_category_id;
    private Date modification_date;
    private boolean valid;

    public static DisabledPaymentsBackupDto fromDao(DisabledPayment dao) {
        return new DisabledPaymentsBackupDto(
                dao.getId(),
                dao.getMonth().getId(),
                dao.getYearCategory().getId(),
                dao.getModificationDate(),
                dao.isValid()
        );
    }
}