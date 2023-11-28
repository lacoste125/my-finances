package com.finances.service;

import com.finances.backup.Backup;
import com.finances.dto.backup.MonthBackupDto;
import com.finances.dto.base.MonthDto;
import com.finances.entity.Month;
import com.finances.enums.MonthType;
import com.finances.exception.notfound.MonthNotFoundException;
import com.finances.repository.MonthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MonthService implements Backup<MonthBackupDto> {

    private final MonthRepository monthRepository;

    @Autowired
    public MonthService(MonthRepository monthRepository) {
        this.monthRepository = monthRepository;
    }

    public List<MonthDto> findAllMonthDtos() {
        return findAllMonths()
                .stream()
                .map(MonthDto::fromDao)
                .collect(Collectors.toList());
    }

    public List<Month> findAllMonths() {
        return StreamSupport.stream(monthRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Month findById(Long id) throws MonthNotFoundException {
        return monthRepository.findById(id).orElseThrow(() -> new MonthNotFoundException(id));
    }

    public Month findByName(MonthType name) throws MonthNotFoundException {
        return monthRepository.findByName(name)
                .orElseThrow(() -> new MonthNotFoundException(name));
    }

    @Override
    public List<MonthBackupDto> getBackup() {
        return StreamSupport.stream(monthRepository.findAll().spliterator(), false)
                .map(MonthBackupDto::fromDao)
                .collect(Collectors.toList());
    }
}