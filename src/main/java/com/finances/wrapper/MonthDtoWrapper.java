package com.finances.wrapper;

import com.finances.dto.base.MonthDto;
import com.finances.entity.Month;
import org.springframework.stereotype.Component;

@Component
public class MonthDtoWrapper implements DtoWrapper<Month, MonthDto> {

    @Override
    public MonthDto mapToDto(Month dao) {
        return MonthDto.builder()
                .id(dao.getId())
                .name(dao.getName())
                .order(dao.getOrder())
                .build();
    }
}