package com.finances.service;

import com.finances.dto.CategoryDto;
import com.finances.entity.Category;
import com.finances.exception.exist.CategoryAlreadyExistException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.repository.CategoryRepository;
import com.finances.request.CreateCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> findAllCategories() {
        return StreamSupport.stream(categoryRepository.findAll().spliterator(), false)
                .map(CategoryDto::fromDao)
                .collect(Collectors.toList());
    }

    public CategoryDto findCategoryDtoById(Long categoryId) throws CategoryNotFoundException {
        Category category = findCategoryById(categoryId);
        return CategoryDto.fromDao(category);
    }

    public Category findCategoryById(Long categoryId) throws CategoryNotFoundException {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    public CategoryDto createCategory(CreateCategoryRequest request) throws CategoryAlreadyExistException {
        Optional<Category> foundCategory = getOptionalCategoryTypeByName(request.getName());

        if (foundCategory.isPresent()) {
            throw new CategoryAlreadyExistException(request.getName());
        } else {
            Category category = new Category();
            category.setName(request.getName());
            category.setDeadline(request.getDeadline());
            Category savedCategory = createCategory(category);

            return CategoryDto.fromDao(savedCategory);
        }
    }

    private Optional<Category> getOptionalCategoryTypeByName(String name) {
        return categoryRepository.selectCategoryByNameIgnoreCase(name);
    }

    private Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
}