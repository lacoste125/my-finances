package com.finances.entity;

import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import static com.finances.util.TableNaming.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = MONTH, schema = PRIV)
public class Month {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @Column(name = NAME)
    @Enumerated(EnumType.STRING)
    private MonthType name;

    @Column(name = MONTH_ORDER)
    private Integer order;
}