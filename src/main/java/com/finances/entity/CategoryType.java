package com.finances.entity;

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
@Table(name = CATEGORY_TYPE, schema = TEST)
public class CategoryType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = CATEGORY_ID)
    private Long Id;

    @Column(name = NAME)
    private String name;

    @Column(name = PAYMENT_DEADLINE)
    private String deadline;
}