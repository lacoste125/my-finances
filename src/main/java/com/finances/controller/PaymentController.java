package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.base.CategoryDetailsDto;
import com.finances.dto.base.DisabledPaymentDto;
import com.finances.dto.base.PaymentDto;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.request.AddPaymentRequest;
import com.finances.request.TogglePaymentRequest;
import com.finances.service.DisabledPaymentService;
import com.finances.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ControllerAdvice
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final DisabledPaymentService disabledPaymentService;

    @Autowired
    public PaymentController(PaymentService paymentService, DisabledPaymentService disabledPaymentService) {
        this.paymentService = paymentService;
        this.disabledPaymentService = disabledPaymentService;
    }

    @PostMapping("/addPayment")
    @ResponseBody
    public ResponseEntity<PaymentDto> addPayment(@RequestBody AddPaymentRequest requestBody)
            throws YearCategoryNotFoundException, MonthNotFoundException, AmountIsEmptyException {
        PaymentDto payment = paymentService.addPayment(requestBody);

        return new Response<PaymentDto>()
                .created(payment);
    }

    @GetMapping("getCategoryPayments")
    @ResponseBody
    public ResponseEntity<CategoryDetailsDto> getCategoryPayments(@RequestParam Long categoryId)
            throws CategoryNotFoundException {
        CategoryDetailsDto categoryPayments = paymentService.getCategoryPayments(categoryId);

        return new Response<CategoryDetailsDto>()
                .ok(categoryPayments);
    }

    @PostMapping("/disablePayment")
    @ResponseBody
    public ResponseEntity<DisabledPaymentDto> disablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPaymentDto disabledPaymentDto = disabledPaymentService.togglePayment(request, true);

        return new Response<DisabledPaymentDto>()
                .created(disabledPaymentDto);
    }

    @PostMapping("/enablePayment")
    @ResponseBody
    public ResponseEntity<DisabledPaymentDto> enablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPaymentDto enabled = disabledPaymentService.togglePayment(request, false);

        return new Response<DisabledPaymentDto>()
                .created(enabled);
    }

    @GetMapping("getDisabledPaymentsByYear")
    @ResponseBody
    public ResponseEntity<List<DisabledPaymentDto>> getDisabledPaymentsByYear(@RequestParam Integer year) {
        List<DisabledPaymentDto> result = disabledPaymentService.getDisabledPaymentsByYear(year);

        return new Response<List<DisabledPaymentDto>>()
                .ok(result);
    }
}