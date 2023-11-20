package com.finances.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

import static com.finances.util.TableNaming.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = PAYMENTS, schema = PRIV)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = YEAR_CATEGORY_ID, nullable = false)
    private YearCategory yearCategory;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = MONTH_ID, nullable = false)
    private Month month;

    @Column(name = AMOUNT)
    private Double amount;

    @Column(name = DATE)
    private Date date;

    @Column(name = COMMENT)
    private String comment;

    @Column(name = VALID)
    private boolean valid;
}