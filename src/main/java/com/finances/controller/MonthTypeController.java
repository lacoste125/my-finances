package com.finances.controller;

import com.finances.dto.MonthTypeDto;
import com.finances.service.MonthTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/months")
public class MonthTypeController {

    private final MonthTypeService monthTypeService;

    @Autowired
    public MonthTypeController(MonthTypeService monthTypeService) {
        this.monthTypeService = monthTypeService;
    }

    @GetMapping()
    @ResponseBody
    public ResponseEntity<List<MonthTypeDto>> getMonthTypes() {
        return ResponseEntity
                .ok()
                .body(monthTypeService.findAllMonthTypes());
    }
}