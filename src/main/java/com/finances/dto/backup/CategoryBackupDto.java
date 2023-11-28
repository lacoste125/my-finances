package com.finances.dto.backup;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finances.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.finances.util.TableNaming.PAYMENT_DEADLINE;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryBackupDto {

    private Long id;
    private String name;
    @JsonProperty(value = PAYMENT_DEADLINE)
    private String paymentDeadline;
    private boolean valid;

    public static CategoryBackupDto fromDao(Category dao) {
        return new CategoryBackupDto(
                dao.getId(),
                dao.getName(),
                dao.getDeadline(),
                dao.isValid()
        );
    }
}