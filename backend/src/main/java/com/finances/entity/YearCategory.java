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
@Table(name = YEAR_CATEGORY, schema = DATA)
public class YearCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = CATEGORY_ID)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = YEAR_ID, nullable = false)
    private Year year;

    @Builder.Default
    @OneToMany(mappedBy = "yearCategory")
    private Set<Payment> payments = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "yearCategory")
    private Set<DisabledPayment> disabledPayments = new HashSet<>();
}