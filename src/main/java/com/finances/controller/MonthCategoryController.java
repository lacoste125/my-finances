package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.MonthCategoryDto;
import com.finances.exception.exist.MonthCategoryAlreadyExistException;
import com.finances.exception.notfound.CategoryTypeNotFoundException;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.request.AddCategoryToMonthRequest;
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

    @PostMapping("/addCategoryToMonth")
    @ResponseBody
    public ResponseEntity<MonthCategoryDto> addCategoryToMonth(@RequestBody AddCategoryToMonthRequest request)
            throws
            CategoryTypeNotFoundException,
            MonthNotFoundException,
            MonthCategoryAlreadyExistException {
        MonthCategoryDto createdMonthCategory = monthCategoryService.addCategoryToMonth(request);

        return new Response<MonthCategoryDto>()
                .created(createdMonthCategory);
    }
}