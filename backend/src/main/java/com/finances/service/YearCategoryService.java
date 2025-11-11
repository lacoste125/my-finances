package com.finances.service;

import com.finances.entity.Category;
import com.finances.entity.Year;
import com.finances.entity.YearCategory;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.exist.YearCategoryAlreadyExistException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.repository.YearCategoryRepository;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class YearCategoryService {

    private final YearCategoryRepository yearCategoryRepository;
    private final CategoryService categoryService;
    private final YearService yearService;

    public List<YearCategory> findAllYearCategories() {
        return yearCategoryRepository.findAll();
    }

    public Optional<YearCategory> findOptionalYearCategoryByCategoryAndYear(Category category, Year year) {
        return yearCategoryRepository.findByCategoryAndYear(category, year);
    }

    public YearCategory addCategoryToYear(AddCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        return saveNewYearCategoryIfNotExist(request.yearId(), request.categoryId());
    }

    private YearCategory saveNewYearCategoryIfNotExist(Long yearId, Long categoryId)
            throws NotFoundException, AlreadyExistException {
        Year year = yearService.findYearById(yearId);
        Category category = categoryService.findCategoryById(categoryId);

        Optional<YearCategory> yearCategory = findOptionalYearCategoryByCategoryAndYear(category, year);
        if (yearCategory.isEmpty()) {
            return yearCategoryRepository.save(
                    YearCategory.builder()
                            .year(year)
                            .category(category)
                            .build()
            );
        }

        throw new YearCategoryAlreadyExistException(category.getName(), year.getYearNumber());
    }

    public YearCategory findByYearCategoryId(Long yearCategoryId) throws NotFoundException {
        return yearCategoryRepository.findById(yearCategoryId)
                .orElseThrow(() -> new YearCategoryNotFoundException(yearCategoryId));
    }

    public YearCategory createCategoryAndAddToYear(AddNewCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        Category category = categoryService.getOptionalCategoryTypeByName(request.name())
                .orElseGet(
                        () -> categoryService.saveNewCategory(request.name(), request.deadline())
                );

        Year year = yearService.findYearByYearNumber(request.yearNumber());

        return saveNewYearCategoryIfNotExist(year.getId(), category.getId());
    }
}