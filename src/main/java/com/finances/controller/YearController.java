package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.YearDto;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.request.NewYearRequest;
import com.finances.service.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/years")
public class YearController {

    private final YearService yearService;

    @Autowired
    public YearController(YearService yearService) {
        this.yearService = yearService;
    }

    @GetMapping("/getAllYears")
    @ResponseBody
    public ResponseEntity<List<YearDto>> getAllYears() {
        List<YearDto> years = yearService.findAllValidYears();

        return new Response<List<YearDto>>()
                .ok(years);
    }

    @GetMapping("/getYearByYearNumber")
    @ResponseBody
    public ResponseEntity<YearDto> getYearByYearNumber(@RequestParam Integer yearNumber) throws YearNotFoundException {
        YearDto year = yearService.findYearDtoByYearNumber(yearNumber);

        return new Response<YearDto>()
                .ok(year);
    }

    @GetMapping("/getYearById")
    @ResponseBody
    public ResponseEntity<YearDto> getYearById(@RequestParam Long id) throws YearNotFoundException {
        YearDto year = yearService.findYearDtoById(id);

        return new Response<YearDto>()
                .ok(year);
    }

    @PutMapping("/addNewYear")
    @ResponseBody
    public ResponseEntity<YearDto> addNewYear(@RequestBody NewYearRequest request) {
        YearDto year = yearService.findOrCreateYear(request);

        return new Response<YearDto>()
                .created(year);
    }
}