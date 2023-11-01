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
@Table(name = MONTH_CATEGORY, schema = TEST)
public class MonthCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = MONTH_CATEGORY_ID)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = CATEGORY_ID)
    private CategoryType category;

    @ManyToOne
    @JoinColumn(name = MONTH_ID, nullable = false)
    private Month month;

    @Column(name = VALID)
    private boolean valid;

    @OneToMany(mappedBy = "monthCategory")
    private List<MonthCategoryValue> categories;
}