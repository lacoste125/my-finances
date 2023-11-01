package com.finances.service;

import com.finances.dto.MonthCategoryValueDto;
import com.finances.entity.MonthCategory;
import com.finances.entity.MonthCategoryValue;
import com.finances.exception.notfound.MonthCategoryNotFoundException;
import com.finances.repository.MonthCategoryValueRepository;
import com.finances.request.AddPaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonthCategoryValueService {

    private final MonthCategoryValueRepository monthCategoryValueRepository;
    private final MonthCategoryService monthCategoryService;

    @Autowired
    public MonthCategoryValueService(
            MonthCategoryValueRepository monthCategoryValueRepository,
            MonthCategoryService monthCategoryService
    ) {
        this.monthCategoryValueRepository = monthCategoryValueRepository;
        this.monthCategoryService = monthCategoryService;
    }

    public MonthCategoryValueDto addPayment(AddPaymentRequest requestBody) throws MonthCategoryNotFoundException {
        MonthCategory monthCategory = monthCategoryService.findMonthCategoryById(requestBody.getMonthCategoryId());

        MonthCategoryValue monthCategoryValue = new MonthCategoryValue();
        monthCategoryValue.setMonthCategory(monthCategory);
        monthCategoryValue.setAmount(requestBody.getAmount());
        monthCategoryValue.setDate(requestBody.getDate());
        monthCategoryValue.setName(requestBody.getName());
        monthCategoryValue.setValid(true);
        MonthCategoryValue saved = monthCategoryValueRepository.save(monthCategoryValue);

        return MonthCategoryValueDto.fromDao(saved);
    }
}