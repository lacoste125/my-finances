package com.finances.service;

import com.finances.CreateYearConfigurationRequest;
import com.finances.dto.MonthDto;
import com.finances.entity.Month;
import com.finances.entity.MonthType;
import com.finances.entity.Year;
import com.finances.repository.MonthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthService {

    private final MonthRepository monthRepository;
    private final YearService yearService;
    private final MonthTypeService monthTypeService;

    @Autowired
    public MonthService(MonthRepository monthRepository, YearService yearService, MonthTypeService monthTypeService) {
        this.monthRepository = monthRepository;
        this.yearService = yearService;
        this.monthTypeService = monthTypeService;
    }

    public List<MonthDto> findAllMonths() {
        return StreamSupport.stream(monthRepository.findAll().spliterator(), false)
                .map(MonthDto::fromDao)
                .collect(Collectors.toList());
    }

    public List<MonthDto> createYearConfiguration(CreateYearConfigurationRequest request) {
        Year year = yearService.findOrCreateYear(request.getYear());
        List<MonthType> monthTypes = monthTypeService.findAllMonthTypes();

        List<Month> months = monthTypes.stream()
                .filter(monthType -> monthRepository.findByMonthTypeIdAndYearId(monthType.getId(), year.getId()).isEmpty())
                .map(monthType -> {
                         Month month = new Month();
                         month.setYear(year);
                         month.setMonthType(monthType);
                         return month;
                     }
                )
                .collect(Collectors.toList());

        return StreamSupport.stream(monthRepository.saveAll(months).spliterator(), false)
                .map(MonthDto::fromDao)
                .collect(Collectors.toList());
    }
}