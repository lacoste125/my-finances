package com.javainuse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YearDto {
    private Integer id;
    private Integer name;

    public static YearDto fromDao(Year dao) {
        return new YearDto(
                dao.getId(),
                dao.getName()
        );
    }
}