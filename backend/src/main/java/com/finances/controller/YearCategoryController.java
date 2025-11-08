package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.YearCategoryDto;
import com.finances.entity.YearCategory;
import com.finances.exception.exist.AlreadyExistException;
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
    public ResponseEntity<List<YearCategoryDto>> getAllYearCategories() {
        List<YearCategory> monthCategories = yearCategoryService.findAllYearCategories();

        return new Response<List<YearCategoryDto>>().ok(yearCategoryDtoWrapper.mapToDtos(monthCategories));
    }

    @GetMapping("/getYearCategoriesByYearId")
    public ResponseEntity<List<YearCategoryDto>> getYearCategoriesByYearId(@RequestParam Long yearId) throws NotFoundException {
        List<YearCategory> yearCategory = yearCategoryService.findByYearId(yearId);

        return new Response<List<YearCategoryDto>>().ok(yearCategoryDtoWrapper.mapToDtos(yearCategory));
    }

    @PostMapping("/addCategoryToYear")
    public ResponseEntity<YearCategoryDto> addCategoryToYear(@RequestBody AddCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        YearCategory result = yearCategoryService.addCategoryToYear(request);

        return new Response<YearCategoryDto>().created(
                yearCategoryDtoWrapper.mapToDto(result)
        );
    }

    @PutMapping("/addNewCategoryToYear")
    public ResponseEntity<YearCategoryDto> addNewCategoryToYear(@RequestBody AddNewCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        YearCategory result = yearCategoryService.createCategoryAndAddToYear(request);

        return new Response<YearCategoryDto>().created(
                yearCategoryDtoWrapper.mapToDto(result)
        );
    }
}