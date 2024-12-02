package com.finances.entity;

import lombok.*;

import javax.persistence.*;

import static com.finances.util.TableNaming.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = CATEGORY, schema = PRIV)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Long id;

    @Column(name = NAME)
    private String name;

    @Column(name = PAYMENT_DEADLINE)
    private String deadline;

    @Column(name = VALID)
    private boolean valid;
}