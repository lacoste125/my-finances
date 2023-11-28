package com.finances.service;

import com.finances.backup.Backup;
import com.finances.dto.backup.DisabledPaymentsBackupDto;
import com.finances.dto.base.DisabledPaymentDto;
import com.finances.entity.DisabledPayment;
import com.finances.entity.Month;
import com.finances.entity.YearCategory;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.repository.DisabledPaymentRepository;
import com.finances.request.TogglePaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class DisabledPaymentService implements Backup<DisabledPaymentsBackupDto> {

    private final DisabledPaymentRepository disabledPaymentRepository;
    private final MonthService monthService;
    private final YearCategoryService yearCategoryService;

    @Autowired
    public DisabledPaymentService(DisabledPaymentRepository disabledPaymentRepository,
                                  MonthService monthService,
                                  YearCategoryService yearCategoryService
    ) {
        this.disabledPaymentRepository = disabledPaymentRepository;
        this.monthService = monthService;
        this.yearCategoryService = yearCategoryService;
    }

    public DisabledPaymentDto togglePayment(TogglePaymentRequest request, boolean expectedValue)
            throws MonthNotFoundException, YearCategoryNotFoundException {

        Month month = monthService.findByName(request.getMonthName());
        YearCategory yearCategory = yearCategoryService.findByYearCategoryId(request.getYearCategoryId());

        Optional<DisabledPayment> optionalDisabledPayment =
                disabledPaymentRepository.selectByMonthIdAndYearCategoryId(month.getId(), request.getYearCategoryId());

        DisabledPayment newDisabledPayment;
        if (optionalDisabledPayment.isPresent()) {
            newDisabledPayment = optionalDisabledPayment.get();
            newDisabledPayment.setValid(expectedValue);
        } else {
            newDisabledPayment = DisabledPayment.builder()
                    .month(month)
                    .yearCategory(yearCategory)
                    .modificationDate(new Date())
                    .valid(expectedValue)
                    .build();
        }
        DisabledPayment saved = disabledPaymentRepository.save(newDisabledPayment);

        return DisabledPaymentDto.fromDao(saved);
    }

    public List<DisabledPaymentDto> getDisabledPaymentsByYear(Integer year) {
        List<DisabledPayment> disabledPayments = disabledPaymentRepository.selectByYear(year);

        return disabledPayments
                .stream()
                .map(DisabledPaymentDto::fromDao)
                .collect(Collectors.toList());
    }

    @Override
    public List<DisabledPaymentsBackupDto> getBackup() {
        return StreamSupport.stream(disabledPaymentRepository.findAll().spliterator(), false)
                .map(DisabledPaymentsBackupDto::fromDao)
                .collect(Collectors.toList());
    }
}