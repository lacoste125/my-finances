package com.finances.repository;

import com.finances.entity.CategoryType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryTypeRepository extends CrudRepository<CategoryType, Long> {

    @Query("SELECT ct " +
            "FROM CategoryType ct " +
            "WHERE ct.name = :name"
    )
    Optional<CategoryType> selectCategoryTypeByName(@Param("name") String name);
}