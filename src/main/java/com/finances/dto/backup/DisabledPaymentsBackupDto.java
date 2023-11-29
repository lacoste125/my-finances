package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.DisabledPayment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import static com.finances.util.TableNaming.MODIFICATION_DATE;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisabledPaymentsBackupDto {
    private Long id;
    private Long month_id;
    private Long year_category_id;
    @JsonProperty(MODIFICATION_DATE)
    private Date modificationDate;
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