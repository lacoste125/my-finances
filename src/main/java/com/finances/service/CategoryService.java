package com.finances.service;

import com.finances.entity.Category;
import com.finances.exception.exist.CategoryAlreadyExistException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.repository.CategoryRepository;
import com.finances.request.CreateCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAllCategories() {
        return categoryRepository.findAllByValidTrue();
    }

    public Category findCategoryDtoById(Long categoryId) throws CategoryNotFoundException {
        return findCategoryById(categoryId);
    }

    public Category findCategoryById(Long categoryId) throws CategoryNotFoundException {
        return categoryRepository.findByIdAndValidTrue(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    public Category createCategory(CreateCategoryRequest request) throws CategoryAlreadyExistException {
        Optional<Category> optionalCategory = getOptionalCategoryTypeByName(request.getName());
        if (optionalCategory.isPresent()) {
            throw new CategoryAlreadyExistException(request.getName());
        }

        return saveNewCategory(request.getName(), request.getDeadline());
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
}