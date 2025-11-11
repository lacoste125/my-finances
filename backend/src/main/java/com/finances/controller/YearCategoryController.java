package com.finances.controller;

import com.finances.dto.YearCategoryDto;
import com.finances.entity.YearCategory;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.request.AddCategoryToYearRequest;
import com.finances.request.AddNewCategoryToYearRequest;
import com.finances.service.YearCategoryService;
import com.finances.wrapper.YearCategoryDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/year-categories")
public class YearCategoryController {

    private final YearCategoryService yearCategoryService;
    private final YearCategoryDtoWrapper yearCategoryDtoWrapper;

    @GetMapping
    public List<YearCategoryDto> getAllYearCategories() {
        List<YearCategory> monthCategories = yearCategoryService.findAllYearCategories();

        return yearCategoryDtoWrapper.mapToDtos(monthCategories);
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public YearCategoryDto addCategoryToYear(@RequestBody AddCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        YearCategory result = yearCategoryService.addCategoryToYear(request);

        return yearCategoryDtoWrapper.mapToDto(result);
    }

    @PutMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public YearCategoryDto addNewCategoryToYear(@RequestBody AddNewCategoryToYearRequest request) throws NotFoundException, AlreadyExistException {
        YearCategory result = yearCategoryService.createCategoryAndAddToYear(request);

        return yearCategoryDtoWrapper.mapToDto(result);
    }
}