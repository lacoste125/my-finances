package com.finances.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

import static com.finances.util.TableNaming.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = MONTH_CATEGORY_VALUE, schema = TEST)
public class MonthCategoryValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = MONTH_CATEGORY_VALUE_ID)
    private Long Id;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = MONTH_CATEGORY_ID, nullable = false)
    private MonthCategory monthCategory;

    @Column(name = AMOUNT)
    private Double amount;

    @Column(name = DATE)
    private Timestamp date;

    @Column(name = NAME)
    private String name;

    @Column(name = VALID)
    private boolean valid;
}