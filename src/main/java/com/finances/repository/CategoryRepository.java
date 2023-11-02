package com.finances.repository;

import com.finances.entity.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

    @Query("SELECT ct " +
            "FROM Category ct " +
            "WHERE ct.name = :name")
    Optional<Category> selectCategoryByNameIgnoreCase(@Param("name") String name);
}