package com.finances.service;

import com.finances.dto.YearDto;
import com.finances.repository.YearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class YearService {

    private final YearRepository yearRepository;

    @Autowired
    public YearService(YearRepository yearRepository) {
        this.yearRepository = yearRepository;
    }

    public List<YearDto> getAllValidYears() {
        return StreamSupport.stream(yearRepository.findAll().spliterator(), false)
                .map(YearDto::fromDao)
                .collect(Collectors.toList());
    }
}
