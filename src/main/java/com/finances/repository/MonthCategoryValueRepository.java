package com.finances.repository;

import com.finances.entity.MonthCategoryValue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthCategoryValueRepository extends CrudRepository<MonthCategoryValue, Long> {
}