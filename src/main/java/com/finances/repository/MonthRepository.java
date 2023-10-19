package com.finances.repository;

import com.finances.entity.Month;
import org.springframework.data.repository.CrudRepository;

public interface MonthRepository extends CrudRepository<Month, Long> {
}