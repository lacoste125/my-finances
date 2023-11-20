package com.finances.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

import static com.finances.util.TableNaming.*;

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
    private Long Id;

    @Column(name = YEAR_NUMBER)
    private Integer yearNumber;

    @OneToMany(mappedBy = "year")
    private List<YearCategory> categories;

    @Override
    public int compareTo(Year o) {
        return getYearNumber() - o.getYearNumber();
    }
}