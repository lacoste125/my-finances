package com.finances.controller;

import com.finances.dto.CategoryDetailsDto;
import com.finances.dto.DisabledPaymentDto;
import com.finances.dto.PaymentDto;
import com.finances.entity.DisabledPayment;
import com.finances.entity.Payment;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.request.AddPaymentRequest;
import com.finances.request.TogglePaymentRequest;
import com.finances.service.DisabledPaymentService;
import com.finances.service.PaymentService;
import com.finances.wrapper.CategoryDetailsDtoWrapper;
import com.finances.wrapper.DisabledPaymentDtoWrapper;
import com.finances.wrapper.PaymentDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final DisabledPaymentService disabledPaymentService;
    private final PaymentDtoWrapper paymentDtoWrapper;
    private final DisabledPaymentDtoWrapper disabledPaymentDtoWrapper;
    private final CategoryDetailsDtoWrapper categoryDetailsDtoWrapper;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public PaymentDto addPayment(@RequestBody AddPaymentRequest requestBody) throws NotFoundException, AmountIsEmptyException {
        Payment payment = paymentService.addPayment(requestBody);

        return paymentDtoWrapper.mapToDto(payment);
    }

    @PostMapping("/enable")
    @ResponseStatus(code = HttpStatus.CREATED)
    public DisabledPaymentDto enablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPayment enabled = disabledPaymentService.togglePayment(request, false);

        return disabledPaymentDtoWrapper.mapToDto(enabled);
    }

    @PostMapping("/disable")
    @ResponseStatus(code = HttpStatus.CREATED)
    public DisabledPaymentDto disablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPayment disabledPaymentDto = disabledPaymentService.togglePayment(request, true);

        return disabledPaymentDtoWrapper.mapToDto(disabledPaymentDto);
    }

    @GetMapping("/by-year-category-id/{yearCategoryId}")
    public CategoryDetailsDto getPaymentsForYearCategory(@PathVariable Long yearCategoryId) throws NotFoundException {
        List<Payment> categoryPayments = paymentService.getPaymentsByYearCategoryId(yearCategoryId);

        return categoryDetailsDtoWrapper.mapToDto(categoryPayments);
    }
}