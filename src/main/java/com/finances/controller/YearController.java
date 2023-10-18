package com.finances.controller;

import com.finances.dto.YearDto;
import com.finances.exception.YearNotFoundException;
import com.finances.service.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/year")
public class YearController {

    private final YearService yearService;

    @Autowired
    public YearController(YearService yearService) {
        this.yearService = yearService;
    }

    @GetMapping("/getAllYears")
    @ResponseBody
    public ResponseEntity<List<YearDto>> getAllYears() {
        List<YearDto> years = yearService.getAllValidYears();

        return ResponseEntity
                .ok()
                .body(years);
    }

    @GetMapping("/getYearByYearNumber")
    @ResponseBody
    public ResponseEntity<YearDto> getYearByYearNumber(@RequestParam Integer yearNumber) throws YearNotFoundException {
        YearDto year = yearService.findYearByYearNumber(yearNumber);

        return ResponseEntity
                .ok()
                .body(year);
    }

    @GetMapping("/getYearById")
    @ResponseBody
    public ResponseEntity<YearDto> getYearById(@RequestParam Long id) throws YearNotFoundException {
        YearDto year = yearService.findYearById(id);

        return ResponseEntity
                .ok()
                .body(year);
    }
}