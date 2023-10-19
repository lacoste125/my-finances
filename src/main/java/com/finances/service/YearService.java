package com.finances.service;

import com.finances.dto.YearDto;
import com.finances.entity.Year;
import com.finances.exception.YearNotFoundException;
import com.finances.repository.YearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class YearService {

    private final YearRepository yearRepository;

    @Autowired
    public YearService(YearRepository yearRepository) {
        this.yearRepository = yearRepository;
    }

    public List<YearDto> findAllValidYears() {
        return StreamSupport.stream(yearRepository.findAll().spliterator(), false)
                .map(YearDto::fromDao)
                .collect(Collectors.toList());
    }

    public YearDto findYearDtoByYearNumber(Integer yearNumber) throws YearNotFoundException {
        Year year = findYearByYearNumber(yearNumber);
        return YearDto.fromDao(year);
    }

    public Year findYearByYearNumber(Integer yearNumber) throws YearNotFoundException {
        return yearRepository.selectYearByYearNumber(yearNumber)
                .orElseThrow(() -> new YearNotFoundException(yearNumber));
    }

    public YearDto findYearById(Long id) throws YearNotFoundException {
        Year year = yearRepository.findById(id)
                .orElseThrow(() -> new YearNotFoundException(id));

        return YearDto.fromDao(year);
    }

    public Year findOrCreateYear(Integer yearNumber) {
        Optional<Year> year = yearRepository.selectYearByYearNumber(yearNumber);

        if (year.isPresent()) {
            return year.get();
        } else {
            Year newYear = new Year();
            newYear.setYearNumber(yearNumber);
            return yearRepository.save(newYear);
        }
    }
}