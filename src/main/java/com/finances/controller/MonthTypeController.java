package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.MonthTypeDto;
import com.finances.service.MonthTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/month-types")
public class MonthTypeController {

    private final MonthTypeService monthTypeService;

    @Autowired
    public MonthTypeController(MonthTypeService monthTypeService) {
        this.monthTypeService = monthTypeService;
    }

    @GetMapping()
    @ResponseBody
    public ResponseEntity<List<MonthTypeDto>> getMonthTypes() {
        List<MonthTypeDto> allMonthTypes = monthTypeService.findAllMonthTypesDtos();

        return new Response<List<MonthTypeDto>>()
                .ok(allMonthTypes);
    }
}