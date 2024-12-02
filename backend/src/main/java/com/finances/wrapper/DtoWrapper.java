package com.finances.wrapper;

import java.util.List;

interface DtoWrapper<T, R> {

    R mapToDto(T dao);

    default List<R> mapToDtos(List<T> daos) {
        return daos.stream()
                .map(this::mapToDto)
                .toList();
    }
}