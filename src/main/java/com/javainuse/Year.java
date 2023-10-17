package com.javainuse;

//import jakarta.persistence.*;


//import static com.finances.utils.TableNaming.*;


import javax.persistence.*;

import static com.javainuse.TableNaming.*;

@Entity
@Table(name = YEAR, schema = TEST)
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = ID)
    private Integer Id;
//
    @Column(name = NAME)
    private Integer name;


    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
    }

    public Year(Integer id, Integer name) {
        Id = id;
        this.name = name;
    }

    public Year() {
    }
}
