package com.finances.repository;

import com.finances.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

    Optional<Category> findCategoryByNameAndValidTrueIgnoreCase(String name);

    Optional<Category> findByIdAndValidTrue(Long id);

    List<Category> findAllByValidTrue();
}