package com.finances.repository;

import com.finances.entity.Year;
import lombok.NonNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YearRepository extends CrudRepository<Year, Long> {

    @Query(""" 
            SELECT y
            FROM Year y
            LEFT JOIN FETCH y.yearCategories yc
            LEFT JOIN FETCH yc.category c
            LEFT JOIN FETCH yc.payments p
            LEFT JOIN FETCH yc.disabledPayments dp
            LEFT JOIN FETCH p.month pm
            LEFT JOIN FETCH dp.month dpm
            WHERE y.yearNumber = :yearNumber
            """)
    Optional<Year> findYearByYearNumber(@Param("yearNumber") Integer yearNumber);

    @Override
    @NonNull
    List<Year> findAll();
}