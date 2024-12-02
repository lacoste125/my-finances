package com.finances.repository;

import com.finances.entity.DisabledPayment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisabledPaymentRepository extends CrudRepository<DisabledPayment, Long> {

    @Query("SELECT dp " +
            "FROM DisabledPayment dp " +
            "WHERE dp.month.id = :monthId " +
            "AND dp.yearCategory.id = :yearCategoryId")
    Optional<DisabledPayment> selectByMonthIdAndYearCategoryId(@Param("monthId") Long monthId, @Param("yearCategoryId") Long yearCategoryId);

    @Query("SELECT dp " +
            "FROM DisabledPayment dp " +
            "WHERE dp.yearCategory.year.yearNumber = :year " +
            "AND dp.valid = true")
    List<DisabledPayment> selectByYear(@Param("year") Integer year);
}