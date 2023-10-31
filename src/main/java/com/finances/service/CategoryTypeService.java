package com.finances.service;

import com.finances.dto.CategoryTypeDto;
import com.finances.entity.CategoryType;
import com.finances.exception.exist.CategoryTypeAlreadyExistException;
import com.finances.exception.notfound.CategoryTypeNotFoundException;
import com.finances.repository.CategoryTypeRepository;
import com.finances.request.CreateCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CategoryTypeService {

    private final CategoryTypeRepository categoryTypeRepository;

    @Autowired
    public CategoryTypeService(CategoryTypeRepository categoryTypeRepository) {
        this.categoryTypeRepository = categoryTypeRepository;
    }

    public List<CategoryTypeDto> findAllCategories() {
        return StreamSupport.stream(categoryTypeRepository.findAll().spliterator(), false)
                .map(CategoryTypeDto::fromDao)
                .collect(Collectors.toList());
    }

    public CategoryTypeDto findCategoryDtoById(Long categoryId) throws CategoryTypeNotFoundException {
        CategoryType categoryType = findCategoryById(categoryId);
        return CategoryTypeDto.fromDao(categoryType);
    }

    public CategoryType findCategoryById(Long categoryId) throws CategoryTypeNotFoundException {
        return categoryTypeRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryTypeNotFoundException(categoryId));
    }

    public CategoryTypeDto createCategory(CreateCategoryRequest request) throws CategoryTypeAlreadyExistException {
        Optional<CategoryType> categoryType = getOptionalCategoryTypeByName(request.getName());

        if (categoryType.isPresent()) {
            throw new CategoryTypeAlreadyExistException(request.getName());
        } else {
            CategoryType category = new CategoryType();
            category.setName(request.getName());
            category.setDeadline(request.getDeadline());
            CategoryType savedCategory = createCategoryType(category);

            return CategoryTypeDto.fromDao(savedCategory);
        }
    }

    private Optional<CategoryType> getOptionalCategoryTypeByName(String name) {
        return categoryTypeRepository.selectCategoryTypeByNameIgnoreCase(name);
    }

    private CategoryType createCategoryType(CategoryType categoryType) {
        return categoryTypeRepository.save(categoryType);
    }
}