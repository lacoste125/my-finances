package com.finances.repository;

import com.finances.entity.Category;
import com.finances.entity.Payment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, Long> {

    @Query("""
            SELECT p
            FROM Payment p
            WHERE p.yearCategory.category = :category
            AND p.yearCategory.category.valid = true
            AND p.valid = true
            """)
    List<Payment> getCategoryPayments(@Param("category") Category category);
}