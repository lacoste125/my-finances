package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

import static com.finances.util.TableNaming.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentsBackupDto {

    private Long id;
    @JsonProperty(value = YEAR_CATEGORY_ID)
    private Long yearCategoryId;
    @JsonProperty(value = MONTH_ID)
    private Long monthId;
    private Double amount;
    private Date date;
    private String comment;
    private boolean valid;

    public static PaymentsBackupDto fromDao(Payment dao) {
        return new PaymentsBackupDto(
                dao.getId(),
                dao.getYearCategory().getId(),
                dao.getMonth().getId(),
                dao.getAmount(),
                dao.getDate(),
                dao.getComment(),
                dao.isValid()
        );
    }
}