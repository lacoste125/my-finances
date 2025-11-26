package com.finances.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import static com.finances.util.TableNaming.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = YEAR, schema = DATA)
public class Year implements Comparable<Year> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @Column(name = YEAR_NUMBER)
    private Integer yearNumber;

    @Builder.Default
    @OneToMany(mappedBy = "year", cascade = CascadeType.ALL)
    private Set<YearCategory> yearCategories = new HashSet<>();

    @Override
    public int compareTo(Year o) {
        return this.yearNumber - o.getYearNumber();
    }
}