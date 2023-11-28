package com.finances.service;

import com.finances.backup.Backup;
import com.finances.dto.backup.CategoryBackupDto;
import com.finances.dto.base.CategoryTypeDto;
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
public class CategoryService implements Backup<CategoryBackupDto> {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryTypeDto> findAllCategories() {
        return categoryRepository.findAllByValidTrue()
                .stream()
                .map(CategoryTypeDto::fromDao)
                .collect(Collectors.toList());
    }

    public CategoryTypeDto findCategoryDtoById(Long categoryId) throws CategoryNotFoundException {
        Category category = findCategoryById(categoryId);
        return CategoryTypeDto.fromDao(category);
    }

    public Category findCategoryById(Long categoryId) throws CategoryNotFoundException {
        return categoryRepository.findByIdAndValidTrue(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    public CategoryTypeDto createCategory(CreateCategoryRequest request) throws CategoryAlreadyExistException {
        Optional<Category> optionalCategory = getOptionalCategoryTypeByName(request.getName());
        if (optionalCategory.isPresent()) {
            throw new CategoryAlreadyExistException(request.getName());
        }

        Category category = saveNewCategory(request.getName(), request.getDeadline());

        return CategoryTypeDto.fromDao(category);
    }

    public Category saveNewCategory(String name, String deadline) {
        Category category = new Category();
        category.setName(name);
        category.setDeadline(deadline);
        category.setValid(true);
        return createCategory(category);
    }

    public Optional<Category> getOptionalCategoryTypeByName(String name) {
        return categoryRepository.findCategoryByNameAndValidTrueIgnoreCase(name);
    }

    private Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryBackupDto> getBackup() {
        return StreamSupport.stream(categoryRepository.findAll().spliterator(), false)
                .map(CategoryBackupDto::fromDao)
                .collect(Collectors.toList());
    }
}