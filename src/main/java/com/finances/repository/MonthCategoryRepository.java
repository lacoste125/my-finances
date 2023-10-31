package com.finances.repository;

import com.finances.entity.CategoryType;
import com.finances.entity.Month;
import com.finances.entity.MonthCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonthCategoryRepository extends CrudRepository<MonthCategory, Long> {
    Optional<MonthCategory> findByCategoryAndMonth(CategoryType categoryType, Month month);
}