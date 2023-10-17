package com.finances.controller;

import com.finances.YearDto;
import com.finances.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/year")
public class YearController {

    private final YearService yearService;

    @Autowired
    public YearController(YearService yearService){
        this.yearService = yearService;
    }

    @GetMapping("/getAllYears")
    public List<YearDto> getAllYears(){
        return yearService.getAllValidYears();
    }
}