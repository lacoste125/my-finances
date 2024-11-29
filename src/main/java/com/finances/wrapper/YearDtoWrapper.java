package com.finances.wrapper;

import com.finances.dto.YearDto;
import com.finances.entity.Year;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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
                        dao.getCategories() != null ? dao.getCategories()
                                .stream()
                                .filter(yearCategory -> yearCategory.getCategory().isValid())
                                .map(yearCategoryDtoWrapper::mapToDto)
                                .collect(Collectors.toList()) : List.of()
                )
                .build();
    }
}