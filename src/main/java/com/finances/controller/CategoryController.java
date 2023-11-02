package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.CategoryDto;
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
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categories = categoryService.findAllCategories();
        return new Response<List<CategoryDto>>()
                .ok(categories);
    }

    @GetMapping("getCategoryById")
    @ResponseBody
    public ResponseEntity<CategoryDto> getCategoryById(
            @RequestParam Long categoryId)
            throws CategoryNotFoundException {

        CategoryDto categories = categoryService.findCategoryDtoById(categoryId);

        return new Response<CategoryDto>()
                .ok(categories);
    }

    @PostMapping("/createCategory")
    @ResponseBody
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CreateCategoryRequest request)
            throws CategoryAlreadyExistException {
        CategoryDto createdCategory = categoryService.createCategory(request);

        return new Response<CategoryDto>()
                .created(createdCategory);
    }
}