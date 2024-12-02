package com.finances.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

import static com.finances.util.TableNaming.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = YEAR, schema = PRIV)
public class Year implements Comparable<Year> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @Column(name = YEAR_NUMBER)
    private Integer yearNumber;

    @OneToMany(mappedBy = "year")
    private List<YearCategory> categories;

    @Override
    public int compareTo(Year o) {
        return getYearNumber() - o.getYearNumber();
    }
}