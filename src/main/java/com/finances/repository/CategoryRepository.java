package com.finances.repository;

import com.finances.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Optional<Category> findCategoryByNameIgnoreCase(@Param("name") String name);
}