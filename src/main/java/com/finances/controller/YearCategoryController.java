package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.YearCategoryDto;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import com.finances.service.YearCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/year-categories")
public class YearCategoryController {

    private final YearCategoryService yearCategoryService;

    @Autowired
    public YearCategoryController(YearCategoryService yearCategoryService) {
        this.yearCategoryService = yearCategoryService;
    }

    @GetMapping("/getAllYearCategories")
    @ResponseBody
    public ResponseEntity<List<YearCategoryDto>> getAllYearCategories() {
        List<YearCategoryDto> monthCategories = yearCategoryService.findAllYearCategories();

        return new Response<List<YearCategoryDto>>()
                .ok(monthCategories);
    }

    @GetMapping("getYearCategoriesByYearId")
    @ResponseBody
    public ResponseEntity<List<YearCategoryDto>> getYearCategoriesByYearId(@RequestParam Long yearId)
            throws YearNotFoundException {

        List<YearCategoryDto> yearCategory = yearCategoryService.findByYearId(yearId);
        return new Response<List<YearCategoryDto>>()
                .ok(yearCategory);
    }

    @PostMapping("/addCategoryToYear")
    public ResponseEntity<Void> addCategoryToYear(@RequestBody AddCategoryToYearRequest request)
            throws YearNotFoundException, CategoryNotFoundException {

        YearCategory result = yearCategoryService.addCategoryToYear(request);

        if (result == null) {
            return new Response<Void>().ok();
        } else {
            return new Response<Void>().created();
        }
    }

    @PutMapping("/addNewCategoryToYear")
    public ResponseEntity<Void> addNewCategoryToYear(@RequestBody AddNewCategoryToYearRequest request)
            throws YearNotFoundException, CategoryNotFoundException {

        YearCategory result = yearCategoryService.createCategoryAndAddToYear(request);

        if (result == null) {
            return new Response<Void>().ok();
        } else {
            return new Response<Void>().created();
        }
    }
}