package com.finances.repository;

import com.finances.entity.Category;
import com.finances.entity.Year;
import com.finances.entity.YearCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YearCategoryRepository extends CrudRepository<YearCategory, Long> {
    Optional<YearCategory> findByCategoryAndYear(Category category, Year year);
    List<YearCategory> findByYear(Year year);
}