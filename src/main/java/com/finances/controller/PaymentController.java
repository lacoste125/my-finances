package com.finances.controller;

import com.finances.config.Response;
import com.finances.dto.PaymentDto;
import com.finances.exception.bad.AmountIsEmptyException;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.exception.notfound.YearCategoryNotFoundException;
import com.finances.request.AddPaymentRequest;
import com.finances.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/addPayment")
    @ResponseBody
    public ResponseEntity<PaymentDto> addPayment(@RequestBody AddPaymentRequest requestBody)
            throws YearCategoryNotFoundException, MonthNotFoundException, AmountIsEmptyException {
        PaymentDto payment = paymentService.addPayment(requestBody);

        return new Response<PaymentDto>()
                .created(payment);
    }
}