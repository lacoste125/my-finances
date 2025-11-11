package com.finances.controller;

import com.finances.dto.YearDto;
import com.finances.entity.Year;
import com.finances.exception.notfound.NotFoundException;
import com.finances.service.YearService;
import com.finances.wrapper.YearDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/years")
public class YearController {

    private final YearService yearService;
    private final YearDtoWrapper yearDtoWrapper;

    @GetMapping
    public List<Integer> getYears() {
        return yearService.getYearNumbers();
    }

    @GetMapping("/by-number/{yearNumber}")
    public YearDto getYearByYearNumber(@PathVariable Integer yearNumber) throws NotFoundException {
        Year year = yearService.findYearByYearNumber(yearNumber);

        return yearDtoWrapper.mapToDto(year);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public YearDto createNextYear() {
        Year year = yearService.createNextYear();

        return yearDtoWrapper.mapToDto(year);
    }
}