package com.finances.wrapper;

import com.finances.dto.YearDto;
import com.finances.entity.Year;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class YearDtoWrapper implements DtoWrapper<Year, YearDto> {

    private final YearCategoryDtoWrapper yearCategoryDtoWrapper;

    @Override
    public YearDto mapToDto(Year dao) {
        return YearDto.builder()
                .id(dao.getId())
                .name(dao.getYearNumber())
                .categories(
                        dao.getYearCategories()
                                .stream()
                                .filter(yearCategory -> yearCategory.getCategory().isValid())
                                .map(yearCategoryDtoWrapper::mapToDto)
                                .toList()
                )
                .build();
    }
}