package com.finances;

import org.junit.jupiter.api.Test;

//@SpringBootTest
class MyFinancesAppTest {

    @Test
    void contextLoads() {
        var test = """
                To jest przykład nr %s
                To jest nr %s
                I ostatni czyli %s
                """.formatted("A", "aa", "Asd");

        System.out.println(test);
    }
}