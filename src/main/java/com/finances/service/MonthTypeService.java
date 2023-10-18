package com.finances.service;

import com.finances.dto.MonthTypeDto;
import com.finances.repository.MonthTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthTypeService {

    private final MonthTypeRepository monthTypeRepository;

    @Autowired
    public MonthTypeService(MonthTypeRepository monthTypeRepository) {
        this.monthTypeRepository = monthTypeRepository;
    }

    public List<MonthTypeDto> findAllMonthTypes() {
        return StreamSupport.stream(monthTypeRepository.findAll().spliterator(), false)
                .map(MonthTypeDto::fromDao)
                .collect(Collectors.toList());
    }
}