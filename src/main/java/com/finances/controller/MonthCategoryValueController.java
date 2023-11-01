package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.MonthCategoryValueDto;
import com.finances.exception.notfound.MonthCategoryNotFoundException;
import com.finances.request.AddPaymentRequest;
import com.finances.service.MonthCategoryValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
@RequestMapping("/payments")
public class MonthCategoryValueController {

    private final MonthCategoryValueService monthCategoryValueService;

    @Autowired
    public MonthCategoryValueController(MonthCategoryValueService monthCategoryValueService) {
        this.monthCategoryValueService = monthCategoryValueService;
    }

    @PostMapping("/addPayment")
    @ResponseBody
    public ResponseEntity<MonthCategoryValueDto> addPayment(@RequestBody AddPaymentRequest requestBody)
            throws MonthCategoryNotFoundException {
        MonthCategoryValueDto allMonthTypes = monthCategoryValueService.addPayment(requestBody);

        return new Response<MonthCategoryValueDto>()
                .created(allMonthTypes);
    }
}