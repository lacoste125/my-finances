package com.finances.repository;

import com.finances.entity.Month;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthRepository extends CrudRepository<Month, Long> {
}