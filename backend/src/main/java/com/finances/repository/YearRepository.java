package com.finances.repository;

import com.finances.entity.Year;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface YearRepository extends CrudRepository<Year, Long> {

    @Query("SELECT y " +
            "FROM Year y " +
            "WHERE y.yearNumber = :yearNumber")
    Optional<Year> selectYearByYearNumber(@Param("yearNumber") Integer yearNumber);
}