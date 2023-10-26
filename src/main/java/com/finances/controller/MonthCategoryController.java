package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.MonthCategoryDto;
import com.finances.service.MonthCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/month-categories")
public class MonthCategoryController {

    private final MonthCategoryService monthCategoryService;

    @Autowired
    public MonthCategoryController(MonthCategoryService monthCategoryService) {
        this.monthCategoryService = monthCategoryService;
    }

    @GetMapping("/getAllMonthCategories")
    @ResponseBody
    public ResponseEntity<List<MonthCategoryDto>> getAllMonthCategories() {
        List<MonthCategoryDto> monthCategories = monthCategoryService.findAllMonthCategories();

        return new Response<List<MonthCategoryDto>>()
                .ok(monthCategories);
    }
}