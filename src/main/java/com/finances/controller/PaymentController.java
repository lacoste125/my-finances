package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.base.CategoryDetailsDto;
import com.finances.dto.base.DisabledPaymentDto;
import com.finances.dto.base.PaymentDto;
import com.finances.entity.DisabledPayment;
import com.finances.entity.Payment;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.CategoryNotFoundException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.request.AddPaymentRequest;
import com.finances.request.TogglePaymentRequest;
import com.finances.service.DisabledPaymentService;
import com.finances.service.PaymentService;
import com.finances.wrapper.DisabledPaymentDtoWrapper;
import com.finances.wrapper.PaymentDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/addPayment")
    public @ResponseBody ResponseEntity<PaymentDto> addPayment(@RequestBody AddPaymentRequest requestBody) throws NotFoundException, AmountIsEmptyException {
        Payment payment = paymentService.addPayment(requestBody);

        return new Response<PaymentDto>().created(paymentDtoWrapper.mapToDto(payment));
    }

    @GetMapping("getCategoryPayments")
    public @ResponseBody ResponseEntity<CategoryDetailsDto> getCategoryPayments(@RequestParam Long categoryId)
            throws CategoryNotFoundException {
        CategoryDetailsDto categoryPayments = paymentService.getCategoryPayments(categoryId);

        return new Response<CategoryDetailsDto>().ok(categoryPayments);
    }

    @PostMapping("/disablePayment")
    public @ResponseBody ResponseEntity<DisabledPaymentDto> disablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPayment disabledPaymentDto = disabledPaymentService.togglePayment(request, true);

        return new Response<DisabledPaymentDto>().created(disabledPaymentDtoWrapper.mapToDto(disabledPaymentDto));
    }

    @PostMapping("/enablePayment")
    public @ResponseBody ResponseEntity<DisabledPaymentDto> enablePayment(@RequestBody TogglePaymentRequest request) throws NotFoundException {
        DisabledPayment enabled = disabledPaymentService.togglePayment(request, false);

        return new Response<DisabledPaymentDto>().created(disabledPaymentDtoWrapper.mapToDto(enabled));
    }

    @GetMapping("/getDisabledPaymentsByYear")
    public @ResponseBody ResponseEntity<List<DisabledPaymentDto>> getDisabledPaymentsByYear(@RequestParam Integer year) {
        List<DisabledPayment> result = disabledPaymentService.getDisabledPaymentsByYear(year);

        return new Response<List<DisabledPaymentDto>>().ok(disabledPaymentDtoWrapper.mapToDtos(result));
    }
}