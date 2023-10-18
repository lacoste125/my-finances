TRUNCATE TABLE test.Year

ALTER TABLE test.Year
DROP COLUMN Name;

ALTER TABLE test.Year
ADD Year_Number varchar(4);