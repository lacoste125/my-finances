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
@Table(name = YEAR_CATEGORY, schema = PRIV)
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
}