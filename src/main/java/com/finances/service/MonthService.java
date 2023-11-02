package com.finances.service;

import com.finances.dto.MonthDto;
import com.finances.entity.Month;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.repository.MonthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthService {

    private final MonthRepository monthRepository;

    @Autowired
    public MonthService(MonthRepository monthRepository) {
        this.monthRepository = monthRepository;
    }

    public List<MonthDto> findAllMonthDtos() {
        return findAllMonths()
                .stream()
                .map(MonthDto::fromDao)
                .collect(Collectors.toList());
    }

    public List<Month> findAllMonths() {
        return StreamSupport.stream(monthRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Month findById(Long id) throws MonthNotFoundException {
        return monthRepository.findById(id).orElseThrow(() -> new MonthNotFoundException(id));
    }
}