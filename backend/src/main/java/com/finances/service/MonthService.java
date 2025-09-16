package com.finances.service;

import com.finances.entity.Month;
import com.finances.enums.MonthType;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.repository.MonthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class MonthService {

    private final MonthRepository monthRepository;

    public List<Month> findAllMonths() {
        return StreamSupport.stream(monthRepository.findAll().spliterator(), false)
                .toList();
    }

    public Month findByName(MonthType name) throws MonthNotFoundException {
        return monthRepository.findByName(name)
                .orElseThrow(() -> new MonthNotFoundException(name));
    }
}