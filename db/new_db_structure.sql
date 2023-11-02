CREATE TABLE test.category
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    name             varchar(255),
    payment_deadline varchar(255),
    CONSTRAINT pk_category PRIMARY KEY (id)
)
GO

CREATE TABLE test.month
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    name        varchar(255),
    month_order int,
    CONSTRAINT pk_month PRIMARY KEY (id)
)
GO

CREATE TABLE test.year
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    year_number int,
    CONSTRAINT pk_year PRIMARY KEY (id)
)
GO

CREATE TABLE test.year_category
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    category_id bigint,
    year_id     bigint                 NOT NULL,
    CONSTRAINT pk_year_category PRIMARY KEY (id)
)
GO

ALTER TABLE test.year_category
    ADD CONSTRAINT FK_YEAR_CATEGORY_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES test.category (id)
GO

ALTER TABLE test.year_category
    ADD CONSTRAINT FK_YEAR_CATEGORY_ON_YEAR FOREIGN KEY (year_id) REFERENCES test.year (id)
GO

CREATE TABLE test.year_category_value
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    year_category_id bigint                 NOT NULL,
    month_id         bigint                 NOT NULL,
    amount           float(53),
    date             date,
    comment          varchar(255),
    valid            bit,
    CONSTRAINT pk_year_category_value PRIMARY KEY (id)
)
GO

ALTER TABLE test.year_category_value
    ADD CONSTRAINT FK_YEAR_CATEGORY_VALUE_ON_MONTH FOREIGN KEY (month_id) REFERENCES test.month (id)
GO

ALTER TABLE test.year_category_value
    ADD CONSTRAINT FK_YEAR_CATEGORY_VALUE_ON_YEAR_CATEGORY FOREIGN KEY (year_category_id) REFERENCES test.year_category (id)
GO

insert into test.month (name, month_order)
values ('STYCZEN', 1);

insert into test.month (name, month_order)
values ('LUTY', 2);

insert into test.month (name, month_order)
values ('MARZEC', 3);

insert into test.month (name, month_order)
values ('KWIECIEN', 4);

insert into test.month (name, month_order)
values ('MAJ', 5);

insert into test.month (name, month_order)
values ('CZERWIEC', 6);

insert into test.month (name, month_order)
values ('LIPIEC', 7);

insert into test.month (name, month_order)
values ('SIERPIEN', 8);

insert into test.month (name, month_order)
values ('WRZESIEN', 9);

insert into test.month (name, month_order)
values ('PAZDZIERNIK', 10);

insert into test.month (name, month_order)
values ('LISTOPAD', 11);

insert into test.month (name, month_order)
values ('GRUDZIEN', 12);
GO
