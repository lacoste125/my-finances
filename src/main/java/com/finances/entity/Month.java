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
@Table(name = MONTH, schema = TEST)
public class Month {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = MONTH_ID)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = MONTH_TYPE_ID)
    private MonthType monthType;

    @ManyToOne
    @JoinColumn(name = Year_Id, nullable = false)
    private Year year;

    @OneToMany(mappedBy = "month")
    private List<MonthCategory> categories;
}