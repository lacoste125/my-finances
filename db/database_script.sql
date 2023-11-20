CREATE SCHEMA priv;
GO

CREATE TABLE priv.category
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    name             varchar(255),
    payment_deadline varchar(255),
    valid            bit,
    CONSTRAINT pk_category PRIMARY KEY (id)
)
GO

CREATE TABLE priv.month
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    name        varchar(255),
    month_order int,
    CONSTRAINT pk_month PRIMARY KEY (id)
)
GO

CREATE TABLE priv.year
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    year_number int,
    CONSTRAINT pk_year PRIMARY KEY (id)
)
GO

CREATE TABLE priv.year_category
(
    id          bigint IDENTITY (1, 1) NOT NULL,
    category_id bigint,
    year_id     bigint                 NOT NULL,
    CONSTRAINT pk_year_category PRIMARY KEY (id)
)
GO

ALTER TABLE priv.year_category
    ADD CONSTRAINT FK_YEAR_CATEGORY_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES priv.category (id)
GO

ALTER TABLE priv.year_category
    ADD CONSTRAINT FK_YEAR_CATEGORY_ON_YEAR FOREIGN KEY (year_id) REFERENCES priv.year (id)
GO

CREATE TABLE priv.Payments
(
    id               bigint IDENTITY (1, 1) NOT NULL,
    year_category_id bigint                 NOT NULL,
    month_id         bigint                 NOT NULL,
    amount           float(53),
    date             date,
    comment          varchar(255),
    valid            bit,
    CONSTRAINT PK_PAYMENTS PRIMARY KEY (id)
)
GO

ALTER TABLE priv.Payments
    ADD CONSTRAINT FK_PAYMENTS_ON_MONTH FOREIGN KEY (month_id) REFERENCES priv.month (id)
GO

ALTER TABLE priv.Payments
    ADD CONSTRAINT FK_PAYMENTS_ON_YEAR_CATEGORY FOREIGN KEY (year_category_id) REFERENCES priv.year_category (id)
GO

CREATE TABLE priv.disabled_payments
(
    id                bigint IDENTITY (1, 1) NOT NULL,
    month_id          bigint                 NOT NULL,
    year_category_id  bigint                 NOT NULL,
    modification_date date,
    valid             bit,
    CONSTRAINT pk_disabled_payments PRIMARY KEY (id)
)
GO

ALTER TABLE priv.disabled_payments
    ADD CONSTRAINT FK_DISABLED_PAYMENTS_ON_MONTH FOREIGN KEY (month_id) REFERENCES priv.disabled_payments (id)
GO

ALTER TABLE priv.disabled_payments
    ADD CONSTRAINT FK_DISABLED_PAYMENTS_ON_YEAR_CATEGORY FOREIGN KEY (year_category_id) REFERENCES priv.year_category (id)
GO

insert into priv.month (name, month_order)
values ('STYCZEN', 1);

insert into priv.month (name, month_order)
values ('LUTY', 2);

insert into priv.month (name, month_order)
values ('MARZEC', 3);

insert into priv.month (name, month_order)
values ('KWIECIEN', 4);

insert into priv.month (name, month_order)
values ('MAJ', 5);

insert into priv.month (name, month_order)
values ('CZERWIEC', 6);

insert into priv.month (name, month_order)
values ('LIPIEC', 7);

insert into priv.month (name, month_order)
values ('SIERPIEN', 8);

insert into priv.month (name, month_order)
values ('WRZESIEN', 9);

insert into priv.month (name, month_order)
values ('PAZDZIERNIK', 10);

insert into priv.month (name, month_order)
values ('LISTOPAD', 11);

insert into priv.month (name, month_order)
values ('GRUDZIEN', 12);
GO

insert into priv.year (year_number)
values (2020);
GO

insert into priv.year (year_number)
values (2021);
GO

insert into priv.year (year_number)
values (2022);
GO

insert into priv.year (year_number)
values (2023);
GO

insert into priv.year (year_number)
values (2024);
GO