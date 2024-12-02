package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.YearDto;
import com.finances.entity.Year;
import com.finances.exception.notfound.NotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.request.NewYearRequest;
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

    @GetMapping("/getAllYears")
    public @ResponseBody ResponseEntity<List<YearDto>> getAllYears() {
        List<Year> years = yearService.findAllYears();

        return new Response<List<YearDto>>().ok(yearDtoWrapper.mapToDtos(years));
    }

    @GetMapping("/getYearByYearNumber")
    public @ResponseBody ResponseEntity<YearDto> getYearByYearNumber(@RequestParam Integer yearNumber) throws NotFoundException {
        Year year = yearService.findYearByYearNumber(yearNumber);

        return new Response<YearDto>().ok(yearDtoWrapper.mapToDto(year));
    }

    @GetMapping("/getYearById")
    public @ResponseBody ResponseEntity<YearDto> getYearById(@RequestParam Long id) throws YearNotFoundException {
        Year year = yearService.findYearById(id);

        return new Response<YearDto>().ok(yearDtoWrapper.mapToDto(year));
    }

    @PutMapping("/addNewYear")
    public @ResponseBody ResponseEntity<YearDto> addNewYear(@RequestBody NewYearRequest request) {
        Year year = yearService.findOrCreateYear(request);

        return new Response<YearDto>().created(yearDtoWrapper.mapToDto(year));
    }

    @PostMapping("/createNextYear")
    public @ResponseBody ResponseEntity<YearDto> createNextYear() {
        Year year = yearService.createNextYear();

        return new Response<YearDto>().created(yearDtoWrapper.mapToDto(year));
    }
}