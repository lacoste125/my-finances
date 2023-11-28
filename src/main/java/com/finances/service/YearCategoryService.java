package com.finances.service;

import com.finances.backup.Backup;
import com.finances.dto.backup.YearCategoryBackupDto;
import com.finances.dto.base.YearCategoryDto;
import com.finances.entity.Category;
import com.finances.entity.Year;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.repository.YearCategoryRepository;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class YearCategoryService implements Backup<YearCategoryBackupDto> {

    private final YearCategoryRepository yearCategoryRepository;
    private final CategoryService categoryService;
    private final YearService yearService;

    @Autowired
    public YearCategoryService(
            YearCategoryRepository yearCategoryRepository,
            CategoryService categoryService,
            YearService yearService
    ) {
        this.yearCategoryRepository = yearCategoryRepository;
        this.categoryService = categoryService;
        this.yearService = yearService;
    }

    public List<YearCategoryDto> findAllYearCategories() {
        return StreamSupport.stream(yearCategoryRepository.findAll().spliterator(), false)
                .map(YearCategoryDto::fromDao)
                .collect(Collectors.toList());
    }

    public Optional<YearCategory> findOptionalYearCategoryByCategoryAndYear(Category category, Year year) {
        return yearCategoryRepository.findByCategoryAndYear(category, year);
    }

    public YearCategory addCategoryToYear(AddCategoryToYearRequest request)
            throws YearNotFoundException, CategoryNotFoundException {
        return saveNewYearCategoryIfNotExist(request.getYearId(), request.getCategoryId());
    }

    private YearCategory saveNewYearCategoryIfNotExist(Long yearId, Long categoryId) throws YearNotFoundException, CategoryNotFoundException {
        Year year = yearService.findYearById(yearId);
        Category category = categoryService.findCategoryById(categoryId);

        YearCategory yearCategory = new YearCategory();
        yearCategory.setYear(year);
        yearCategory.setCategory(category);

        Optional<YearCategory> checked = findOptionalYearCategoryByCategoryAndYear(category, year);
        if (checked.isEmpty()) {
            return yearCategoryRepository.save(yearCategory);
        } else return null;
    }

    public List<YearCategoryDto> findByYearId(Long yearId) throws YearNotFoundException {
        Year year = yearService.findYearById(yearId);

        return yearCategoryRepository
                .findByYear(year)
                .stream()
                .map(YearCategoryDto::fromDao)
                .collect(Collectors.toList());
    }

    public YearCategory findByYearCategoryId(Long yearCategoryId) throws YearCategoryNotFoundException {
        return yearCategoryRepository.findById(yearCategoryId)
                .orElseThrow(() -> new YearCategoryNotFoundException(yearCategoryId));
    }

    public YearCategory createCategoryAndAddToYear(AddNewCategoryToYearRequest request)
            throws YearNotFoundException, CategoryNotFoundException {
        Optional<Category> optionalCategory = categoryService.getOptionalCategoryTypeByName(request.getName());

        Category category =
                optionalCategory.orElseGet(
                        () -> categoryService.saveNewCategory(request.getName(), request.getDeadline())
                );

        Year year = yearService.findYearByYearNumber(request.getYearNumber());
        return saveNewYearCategoryIfNotExist(year.getId(), category.getId());
    }

    @Override
    public List<YearCategoryBackupDto> getBackup() {
        return StreamSupport.stream(yearCategoryRepository.findAll().spliterator(), false)
                .map(YearCategoryBackupDto::fromDao)
                .collect(Collectors.toList());
    }
}