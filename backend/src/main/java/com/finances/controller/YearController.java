package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.YearDto;
import com.finances.entity.Year;
import com.finances.exception.notfound.NotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.service.YearService;
import com.finances.wrapper.YearDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/years")
public class YearController {

    private final YearService yearService;
    private final YearDtoWrapper yearDtoWrapper;

    @GetMapping
    public  List<Integer> getYears() {
        return yearService.getYearNumbers();
    }

    @GetMapping("/by-number/{yearNumber}")
    public  ResponseEntity<YearDto> getYearByYearNumber(@PathVariable Integer yearNumber) throws NotFoundException {
        Year year = yearService.findYearByYearNumber(yearNumber);

        return new Response<YearDto>().ok(yearDtoWrapper.mapToDto(year));
    }

    @PostMapping
    public  ResponseEntity<YearDto> createNextYear() {
        Year year = yearService.createNextYear();

        return new Response<YearDto>().created(yearDtoWrapper.mapToDto(year));
    }
}