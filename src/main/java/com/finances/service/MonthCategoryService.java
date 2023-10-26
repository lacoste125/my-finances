package com.finances.service;

import com.finances.dto.MonthCategoryDto;
import com.finances.repository.MonthCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthCategoryService {

    private final MonthCategoryRepository monthCategoryRepository;

    @Autowired
    public MonthCategoryService(MonthCategoryRepository monthCategoryRepository) {
        this.monthCategoryRepository = monthCategoryRepository;
    }

    public List<MonthCategoryDto> findAllMonthCategories() {
        return StreamSupport.stream(monthCategoryRepository.findAll().spliterator(), false)
                .map(MonthCategoryDto::fromDao)
                .collect(Collectors.toList());
    }
}