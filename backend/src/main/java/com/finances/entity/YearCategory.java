package com.finances.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static com.finances.util.TableNaming.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = YEAR_CATEGORY, schema = DATA)
public class YearCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @ManyToOne
    @JoinColumn(name = CATEGORY_ID)
    private Category category;

    @ManyToOne
    @JoinColumn(name = YEAR_ID, nullable = false)
    private Year year;

    @OneToMany(mappedBy = "yearCategory")
    private List<Payment> payments;

    @OneToMany(mappedBy = "yearCategory")
    private List<DisabledPayment> disabledPayments;
}