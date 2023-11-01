package com.finances.service;

import com.finances.dto.MonthCategoryDto;
import com.finances.entity.CategoryType;
import com.finances.entity.Month;
import com.finances.entity.MonthCategory;
import com.finances.exception.notfound.CategoryTypeNotFoundException;
import com.finances.exception.notfound.MonthCategoryNotFoundException;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.YearNotFoundException;
import com.finances.repository.MonthCategoryRepository;
import com.finances.request.AddCategoryToYearRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthCategoryService {

    private final MonthCategoryRepository monthCategoryRepository;
    private final CategoryTypeService categoryTypeService;
    private final MonthService monthService;
    private final YearService yearService;

    @Autowired
    public MonthCategoryService(
            MonthCategoryRepository monthCategoryRepository,
            CategoryTypeService categoryTypeService,
            MonthService monthService,
            YearService yearService
    ) {
        this.monthCategoryRepository = monthCategoryRepository;
        this.categoryTypeService = categoryTypeService;
        this.monthService = monthService;
        this.yearService = yearService;
    }

    public List<MonthCategoryDto> findAllMonthCategories() {
        return StreamSupport.stream(monthCategoryRepository.findAll().spliterator(), false)
                .map(MonthCategoryDto::fromDao)
                .collect(Collectors.toList());
    }

    public void addCategoryToMonth(Long categoryId, Long monthId)
            throws CategoryTypeNotFoundException, MonthNotFoundException {
        CategoryType categoryType = categoryTypeService.findCategoryById(categoryId);
        Month month = monthService.findMonthById(monthId);

        Optional<MonthCategory> monthCategory = findOptionalMonthCategoryByCategoryTypeAndMonth(categoryType, month);
        if (monthCategory.isEmpty()) {
            MonthCategory newMonthCategory = new MonthCategory();
            newMonthCategory.setCategory(categoryType);
            newMonthCategory.setMonth(month);
            monthCategoryRepository.save(newMonthCategory);
        }
    }

    public Optional<MonthCategory> findOptionalMonthCategoryByCategoryTypeAndMonth(CategoryType categoryType, Month month) {
        return monthCategoryRepository.findByCategoryAndMonth(categoryType, month);
    }

    public MonthCategory findMonthCategoryById(Long monthCategoryId) throws MonthCategoryNotFoundException {
        return monthCategoryRepository.findById(monthCategoryId)
                .orElseThrow(() -> new MonthCategoryNotFoundException(monthCategoryId));
    }

    public void addCategoryToYear(AddCategoryToYearRequest request)
            throws
            YearNotFoundException,
            CategoryTypeNotFoundException,
            MonthNotFoundException {
        List<Month> months = yearService.findYearById(request.getYearId()).getMonths();
        for (Month month : months) {
            addCategoryToMonth(request.getCategoryId(), month.getId());
        }
    }
}