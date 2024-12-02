package com.finances.repository;

import com.finances.entity.Month;
import com.finances.enums.MonthType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonthRepository extends CrudRepository<Month, Long> {
    Optional<Month> findByName(MonthType name);
}