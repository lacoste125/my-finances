package com.finances.controller;

import com.finances.dto.MonthDto;
import com.finances.entity.Month;
import com.finances.service.MonthService;
import com.finances.wrapper.MonthDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/months")
public class MonthController {

    private final MonthService monthService;
    private final MonthDtoWrapper monthDtoWrapper;

    @GetMapping
    public List<MonthDto> getAllMonths() {
        List<Month> allMonths = monthService.findAllMonths();

        return monthDtoWrapper.mapToDtos(allMonths);
    }
}