package com.finances.service;

import com.finances.dto.backup.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Service
public class BackupService {

    private final EmailService emailService;
    private final CategoryService categoryService;
    private final DisabledPaymentService disabledPaymentService;
    private final MonthService monthService;
    private final PaymentService paymentService;
    private final YearService yearService;
    private final YearCategoryService yearCategoryService;

    @Autowired
    public BackupService(EmailService emailService,
                         CategoryService categoryService,
                         DisabledPaymentService disabledPaymentService,
                         MonthService monthService,
                         PaymentService paymentService,
                         YearService yearService,
                         YearCategoryService yearCategoryService) {
        this.emailService = emailService;
        this.categoryService = categoryService;
        this.disabledPaymentService = disabledPaymentService;
        this.monthService = monthService;
        this.paymentService = paymentService;
        this.yearService = yearService;
        this.yearCategoryService = yearCategoryService;
    }

    private DatabaseBackupDto baackupp() {
        List<CategoryBackupDto> categoryBackup = categoryService.getBackup();
        List<DisabledPaymentsBackupDto> disabledPaymentsBackup = disabledPaymentService.getBackup();
        List<MonthBackupDto> monthBackup = monthService.getBackup();
        List<PaymentsBackupDto> paymentBackup = paymentService.getBackup();
        List<YearBackupDto> yearBackup = yearService.getBackup();
        List<YearCategoryBackupDto> yearCategoryBackup = yearCategoryService.getBackup();

        return DatabaseBackupDto.builder()
                .categories(categoryBackup)
                .disabledPayments(disabledPaymentsBackup)
                .months(monthBackup)
                .payments(paymentBackup)
                .years(yearBackup)
                .yearCategories(yearCategoryBackup)
                .build();
    }

    public DatabaseBackupDto createBackupAndSendEmail() throws SQLException, IOException, ClassNotFoundException {
        return baackupp();
//        emailService.sendMail("mariusz.iwanski1@gmail.com", "Backup", "Backup message.");
    }
}