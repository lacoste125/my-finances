package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.CategoryTypeDto;
import com.finances.exception.exist.CategoryTypeAlreadyExistException;
import com.finances.exception.notfound.CategoryTypeNotFoundException;
import com.finances.request.CreateCategoryRequest;
import com.finances.service.CategoryTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/category-types")
public class CategoryTypeController {

    private final CategoryTypeService categoryTypeService;

    @Autowired
    public CategoryTypeController(CategoryTypeService categoryTypeService) {
        this.categoryTypeService = categoryTypeService;
    }

    @GetMapping("getAllCategoryTypes")
    @ResponseBody
    public ResponseEntity<List<CategoryTypeDto>> getAllCategoryTypes() {
        List<CategoryTypeDto> categories = categoryTypeService.findAllCategories();
        return new Response<List<CategoryTypeDto>>()
                .ok(categories);
    }

    @GetMapping("getCategoryTypeById")
    @ResponseBody
    public ResponseEntity<CategoryTypeDto> getCategoryTypeById(
            @RequestParam Long categoryTypeId)
            throws CategoryTypeNotFoundException {

        CategoryTypeDto categories = categoryTypeService.findCategoryDtoById(categoryTypeId);

        return new Response<CategoryTypeDto>()
                .ok(categories);
    }

    @PostMapping("/createCategory")
    @ResponseBody
    public ResponseEntity<CategoryTypeDto> createCategory(@RequestBody CreateCategoryRequest request)
            throws CategoryTypeAlreadyExistException {
        CategoryTypeDto createdCategory = categoryTypeService.createCategory(request);

        return new Response<CategoryTypeDto>()
                .created(createdCategory);
    }
}