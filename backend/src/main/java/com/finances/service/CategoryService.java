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

    public Category findCategoryById(Long categoryId) throws CategoryNotFoundException {
        return categoryRepository.findByIdAndValidTrue(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    public Category createCategory(CreateCategoryRequest request) throws CategoryAlreadyExistException {
        ensureCategoryDoesNotExist(request.name());

        return saveNewCategory(request.name(), request.deadline());
    }

    private void ensureCategoryDoesNotExist(String categoryName) throws CategoryAlreadyExistException {
        if (getOptionalCategoryTypeByName(categoryName).isPresent()) {
            throw new CategoryAlreadyExistException(categoryName);
        }
    }

    public Category saveNewCategory(String name, String deadline) {
        return createCategory(
                Category.builder()
                        .name(name)
                        .deadline(deadline)
                        .valid(true)
                        .build()
        );
    }

    public Optional<Category> getOptionalCategoryTypeByName(String name) {
        return categoryRepository.findCategoryByNameAndValidTrueIgnoreCase(name);
    }

    private Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
}