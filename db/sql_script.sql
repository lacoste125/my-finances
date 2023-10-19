CREATE SCHEMA test;
GO

CREATE TABLE test.Year (
Id INT IDENTITY (1,1) CONSTRAINT PK_Year PRIMARY KEY,
Year_Number INT NOT NULL
);
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