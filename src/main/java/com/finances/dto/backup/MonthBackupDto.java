package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.Month;
import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.finances.util.TableNaming.MONTH_ORDER;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthBackupDto {

    private Long id;
    private MonthType name;
    @JsonProperty(MONTH_ORDER)
    private Integer monthOrder;

    public static MonthBackupDto fromDao(Month dao) {
        return new MonthBackupDto(
                dao.getId(),
                dao.getName(),
                dao.getOrder()
        );
    }
}