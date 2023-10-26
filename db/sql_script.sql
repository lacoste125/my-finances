CREATE SCHEMA test;
GO

CREATE TABLE test.Year (
Id INT IDENTITY (1,1) CONSTRAINT PK_Year PRIMARY KEY,
Year_Number INT NOT NULL
);
GO

EXEC sys.sp_addextendedproperty
@name=N'MS_Description',
@value=N'Tabela zawiera konfigurację przechowującą wszystkie lata.' ,
@level0type=N'SCHEMA',
@level0name=N'test',
@level1type=N'TABLE',
@level1name=N'Year';
GO

INSERT INTO [test].[Year]
           (Year_Number)
     VALUES
           (2020),
		   (2021),
		   (2022);
GO

CREATE TABLE test.Month_Type (
Id INT IDENTITY (1,1) CONSTRAINT PK_Month_Type PRIMARY KEY,
Name varchar(20) NOT NULL,
Month_Order INT NOT NULL
);
GO

INSERT INTO [test].[Month_Type]
           (Name, Month_Order)
     VALUES
           ('Styczeń', 1),
		   ('Luty', 2),
		   ('Marzec', 3),
		   ('Kwiecień', 4),
		   ('Maj', 5),
		   ('Czerwiec', 6),
		   ('Lipiec', 7),
		   ('Sierpień', 8),
		   ('Wrzesień', 9),
		   ('Październik', 10),
		   ('Listopad', 11),
		   ('Grudzień', 12);
GO

CREATE TABLE test.Month (
Month_Id INT NOT NULL IDENTITY (1,1) CONSTRAINT PK_Month PRIMARY KEY,
Month_Type_Id INT NOT NULL CONSTRAINT FK_Month_Type FOREIGN KEY REFERENCES test.Month_Type(Id),
Year_Id INT NOT NULL CONSTRAINT FK_Year FOREIGN KEY REFERENCES test.Year(Id)
);
GO

CREATE TABLE test.Category (
Category_Id INT IDENTITY (1,1) CONSTRAINT PK_Category PRIMARY KEY,
Name varchar(30) NOT NULL,
Payment_Deadline varchar(20)
);
GO

EXEC sys.sp_addextendedproperty
@name=N'MS_Description',
@value=N'Ta tabela zawiera kategorie dla których dostępne będą opłaty miesięczne',
@level0type=N'SCHEMA',
@level0name=N'test',
@level1type=N'TABLE',
@level1name=N'Category';
@level2type=N'COLUMN',
@level2name=N'Category_Id'
GO

CREATE TABLE test.Month_Category (
Month_Category_Id INT NOT NULL IDENTITY (1,1) CONSTRAINT PK_Month_Category PRIMARY KEY,
Category_Id INT NOT NULL CONSTRAINT FK_Category FOREIGN KEY REFERENCES test.Category(Category_Id),
Month_Id INT NOT NULL CONSTRAINT FK_Month FOREIGN KEY REFERENCES test.Month(Month_Id)
);
GO

EXEC sys.sp_addextendedproperty
@name=N'MS_Description',
@value=N'Ta tabela zawiera info o tym jakie kategorie są przypisane do do konkretnego miesiąca w roku.',
@level0type=N'SCHEMA',
@level0name=N'test',
@level1type=N'TABLE',
@level1name=N'Month_Category',
@level2type=N'COLUMN',
@level2name=N'Month_Category_Id'
GO

CREATE TABLE test.Month_Category_Value (
Month_Category_Value_Id INT NOT NULL IDENTITY (1,1) CONSTRAINT PK_Month_Category_Value PRIMARY KEY,
Month_Category_Id INT NOT NULL CONSTRAINT FK_Month_Category FOREIGN KEY REFERENCES test.Month_Category(Month_Category_Id),
Amount DECIMAL(10, 2),
Date DATE,
Name varchar(200),
Valid BIT
);
GO

EXEC sys.sp_addextendedproperty
@name=N'MS_Description',
@value=N'Ta tabela zawiera info o opłatach dla danej kategorii w danym miesiącu.',
@level0type=N'SCHEMA',
@level0name=N'test',
@level1type=N'TABLE',
@level1name=N'Month_Category_Value',
@level2type=N'COLUMN',
@level2name=N'Month_Category_Value_Id'
GO