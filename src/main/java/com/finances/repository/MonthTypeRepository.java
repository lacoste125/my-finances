package com.finances.repository;

import com.finances.entity.MonthType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthTypeRepository extends CrudRepository<MonthType, Long> {
}