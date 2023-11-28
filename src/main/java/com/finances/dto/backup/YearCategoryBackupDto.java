package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.YearCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.finances.util.TableNaming.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YearCategoryBackupDto {

    private Long id;
    @JsonProperty(value = CATEGORY_ID)
    private Long categoryId;
    @JsonProperty(value = YEAR_ID)
    private Long yearId;

    public static YearCategoryBackupDto fromDao(YearCategory dao) {
        return new YearCategoryBackupDto(
                dao.getId(),
                dao.getCategory().getId(),
                dao.getYear().getId()
        );
    }
}