package com.finances.service;

import com.finances.entity.Category;
import com.finances.entity.Year;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.repository.YearCategoryRepository;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class YearCategoryService {

    private final YearCategoryRepository yearCategoryRepository;
    private final CategoryService categoryService;
    private final YearService yearService;

    public List<YearCategory> findAllYearCategories() {
        return StreamSupport.stream(yearCategoryRepository.findAll().spliterator(), false).toList();
    }

    public Optional<YearCategory> findOptionalYearCategoryByCategoryAndYear(Category category, Year year) {
        return yearCategoryRepository.findByCategoryAndYear(category, year);
    }

    public YearCategory addCategoryToYear(AddCategoryToYearRequest request)
            throws YearNotFoundException, CategoryNotFoundException {
        return saveNewYearCategoryIfNotExist(request.yearId(), request.categoryId());
    }

    private YearCategory saveNewYearCategoryIfNotExist(Long yearId, Long categoryId) throws YearNotFoundException, CategoryNotFoundException {
        Year year = yearService.findYearById(yearId);
        Category category = categoryService.findCategoryById(categoryId);

        Optional<YearCategory> checked = findOptionalYearCategoryByCategoryAndYear(category, year);
        if (checked.isEmpty()) {
            return yearCategoryRepository.save(
                    YearCategory.builder()
                            .year(year)
                            .category(category)
                            .build()
            );
        } else return null;
    }

    public List<YearCategory> findByYearId(Long yearId) throws NotFoundException {
        Year year = yearService.findYearById(yearId);

        return yearCategoryRepository.findByYear(year);
    }

    public YearCategory findByYearCategoryId(Long yearCategoryId) throws NotFoundException {
        return yearCategoryRepository.findById(yearCategoryId)
                .orElseThrow(() -> new YearCategoryNotFoundException(yearCategoryId));
    }

    public YearCategory createCategoryAndAddToYear(AddNewCategoryToYearRequest request) throws NotFoundException {
        Optional<Category> optionalCategory = categoryService.getOptionalCategoryTypeByName(request.name());

        Category category = optionalCategory.orElseGet(
                () -> categoryService.saveNewCategory(request.name(), request.deadline())
        );

        Year year = yearService.findYearByYearNumber(request.yearNumber());

        return saveNewYearCategoryIfNotExist(year.getId(), category.getId());
    }
}