package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.base.YearCategoryDto;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.NotFoundException;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import com.finances.service.YearCategoryService;
import com.finances.wrapper.YearCategoryDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/year-categories")
public class YearCategoryController {

    private final YearCategoryService yearCategoryService;
    private final YearCategoryDtoWrapper yearCategoryDtoWrapper;

    @GetMapping("/getAllYearCategories")
    public @ResponseBody ResponseEntity<List<YearCategoryDto>> getAllYearCategories() {
        List<YearCategory> monthCategories = yearCategoryService.findAllYearCategories();

        return new Response<List<YearCategoryDto>>().ok(yearCategoryDtoWrapper.mapToDtos(monthCategories));
    }

    @GetMapping("getYearCategoriesByYearId")
    public @ResponseBody ResponseEntity<List<YearCategoryDto>> getYearCategoriesByYearId(@RequestParam Long yearId) throws NotFoundException {
        List<YearCategory> yearCategory = yearCategoryService.findByYearId(yearId);

        return new Response<List<YearCategoryDto>>().ok(yearCategoryDtoWrapper.mapToDtos(yearCategory));
    }

    @PostMapping("/addCategoryToYear")
    public @ResponseBody ResponseEntity<Void> addCategoryToYear(@RequestBody AddCategoryToYearRequest request) throws NotFoundException {
        YearCategory result = yearCategoryService.addCategoryToYear(request);

        if (result == null) {
            return new Response<Void>().ok();
        } else {
            return new Response<Void>().created();
        }
    }

    @PutMapping("/addNewCategoryToYear")
    public ResponseEntity<Void> addNewCategoryToYear(@RequestBody AddNewCategoryToYearRequest request) throws NotFoundException {
        YearCategory result = yearCategoryService.createCategoryAndAddToYear(request);

        if (result == null) {
            return new Response<Void>().ok();
        } else {
            return new Response<Void>().created();
        }
    }
}