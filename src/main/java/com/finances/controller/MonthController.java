package com.finances.controller;

import com.finances.request.CreateYearConfigurationRequest;
import com.finances.config.Response;
import com.finances.dto.MonthDto;
import com.finances.service.MonthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/months")
public class MonthController {

    private final MonthService monthService;

    @Autowired
    public MonthController(MonthService monthService) {
        this.monthService = monthService;
    }

    @GetMapping("/getAllMonths")
    @ResponseBody
    public ResponseEntity<List<MonthDto>> getAllMonths() {
        List<MonthDto> months = monthService.findAllMonths();

        return new Response<List<MonthDto>>()
                .ok(months);
    }

    @PostMapping("/createYearConfiguration")
    @ResponseBody
    public ResponseEntity<List<MonthDto>> createYearConfiguration(@RequestBody CreateYearConfigurationRequest request) {
        List<MonthDto> yearConfig = monthService.createYearConfiguration(request);

        if (yearConfig.isEmpty())
            return new Response<List<MonthDto>>()
                    .ok(yearConfig);
        else
            return new Response<List<MonthDto>>()
                    .created(yearConfig);
    }
}