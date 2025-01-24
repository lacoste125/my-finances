package com.finances.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

import static com.finances.util.TableNaming.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = DISABLED_PAYMENTS, schema = PRIV)
@EntityListeners(AuditingEntityListener.class)
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

    @With
    @Column(name = COMMENT)
    private String comment;

    @Column(name = MODIFICATION_DATE)
    @LastModifiedDate
    private Date modificationDate;

    @With
    @Column(name = VALID)
    private boolean valid;
}