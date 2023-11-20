package com.finances.entity;

import lombok.*;

import javax.persistence.*;

import java.util.Date;

import static com.finances.util.TableNaming.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = DISABLED_PAYMENTS, schema = PRIV)
public class DisabledPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = MONTH_ID, nullable = false)
    private Month month;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = YEAR_CATEGORY_ID, nullable = false)
    private YearCategory yearCategory;

    @Column(name = MODIFICATION_DATE)
    private Date modificationDate;

    @Column(name = VALID)
    private boolean valid;
}