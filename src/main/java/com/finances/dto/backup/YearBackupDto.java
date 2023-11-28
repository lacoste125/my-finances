package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.Year;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.finances.util.TableNaming.YEAR_NUMBER;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YearBackupDto {

    private Long id;
    @JsonProperty(YEAR_NUMBER)
    private Integer yearNumber;

    public static YearBackupDto fromDao(Year dao) {
        return new YearBackupDto(
                dao.getId(),
                dao.getYearNumber()
        );
    }
}