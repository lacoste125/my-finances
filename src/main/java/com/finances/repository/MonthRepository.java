package com.finances.repository;

import com.finances.entity.Month;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MonthRepository extends CrudRepository<Month, Long> {

    @Query("SELECT m " +
            "FROM Month m " +
            "WHERE m.monthType.id = :monthTypeId " +
            "AND m.year.id = :yearId")
    List<Month> findByMonthTypeIdAndYearId(@Param("monthTypeId") Long monthTypeId, @Param("yearId") Long yearId);
}