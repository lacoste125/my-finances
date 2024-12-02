package com.finances.exception.bad;

public class AmountIsEmptyException extends BadRequestException {
    public AmountIsEmptyException(Double amount) {
        super("Amount '" + amount + "' is not allowed.");
    }
}