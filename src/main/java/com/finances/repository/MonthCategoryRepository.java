package com.finances.repository;

import com.finances.entity.MonthCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthCategoryRepository extends CrudRepository<MonthCategory, Long> {
}