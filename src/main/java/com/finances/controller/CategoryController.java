package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.CategoryTypeDto;
import com.finances.exception.exist.CategoryAlreadyExistException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.request.CreateCategoryRequest;
import com.finances.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("getAllCategories")
    @ResponseBody
    public ResponseEntity<List<CategoryTypeDto>> getAllCategories() {
        List<CategoryTypeDto> categories = categoryService.findAllCategories();
        return new Response<List<CategoryTypeDto>>()
                .ok(categories);
    }

    @GetMapping("getCategoryById")
    @ResponseBody
    public ResponseEntity<CategoryTypeDto> getCategoryById(@RequestParam Long categoryId)
            throws CategoryNotFoundException {

        CategoryTypeDto categories = categoryService.findCategoryDtoById(categoryId);

        return new Response<CategoryTypeDto>()
                .ok(categories);
    }

    @PostMapping("/createCategory")
    @ResponseBody
    public ResponseEntity<CategoryTypeDto> createCategory(@RequestBody CreateCategoryRequest request)
            throws CategoryAlreadyExistException {
        CategoryTypeDto createdCategory = categoryService.createCategory(request);

        return new Response<CategoryTypeDto>()
                .created(createdCategory);
    }
}