package com.javainuse;


public class YearDto {
    private Integer id;
    private Integer name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
    }


    public YearDto(Integer id, Integer name) {
        this.id = id;
        this.name = name;
    }

    public static YearDto fromDao(Year dao) {
        return new YearDto(
                dao.getId(),
                dao.getName()
        );
    }
}
