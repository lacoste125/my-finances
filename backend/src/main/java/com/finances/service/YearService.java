package com.finances.service;

import com.finances.entity.Year;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.repository.YearRepository;
import com.finances.request.NewYearRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class YearService {

    private final YearRepository yearRepository;

    public List<Integer> getYearNumbers() {
        return findAllYears().stream()
                .map(Year::getYearNumber)
                .toList();
    }

    public List<Year> findAllYears() {
        return StreamSupport.stream(yearRepository.findAll().spliterator(), false)
                .toList();
    }

    public Year findYearByYearNumber(Integer yearNumber) throws YearNotFoundException {
        return yearRepository.selectYearByYearNumber(yearNumber)
                .orElseThrow(() -> new YearNotFoundException(yearNumber));
    }

    public Year findYearById(Long id) throws YearNotFoundException {
        return yearRepository.findById(id)
                .orElseThrow(() -> new YearNotFoundException(id));
    }

    public Year findOrCreateYear(NewYearRequest request) {
        return yearRepository.selectYearByYearNumber(request.year())
                .orElseGet(
                        () -> yearRepository.save(
                                Year.builder()
                                        .yearNumber(request.year())
                                        .build()
                        )
                );
    }

    public Year createNextYear() {
        Integer maxYear = findAllYears()
                .stream()
                .max(Comparator.comparing(Year::getYearNumber))
                .orElseThrow(NoSuchElementException::new)
                .getYearNumber();

        return yearRepository.save(
                Year.builder()
                        .yearNumber(++maxYear)
                        .build()
        );
    }
}