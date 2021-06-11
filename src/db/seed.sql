USE company_db;
INSERT INTO department (name)
VALUES 
("Human Resources"),
("IT"),
("Sales"),
("Finance"),
("Estates");
INSERT INTO role (title, salary, department_id)
VALUES 
("HR Advisor", "30000", "1"),
("HR Manager", "40000", "1"),
("HR Director", "50000", "1"),
("IT Service Desk Advisor", "25000", "2"),
("IT Engineer", "35000", "2"),
("IT Manager", "40000", "2"),
("Sales Administrator", "20000", "3"),
("Sales Supervisor", "25000", "3"),
("Sales Manager", "40000", "3"),
("Finance Support Officer", "25000", "4"),
("Finance Manager", "40000", "4"),
("Estates Administrator", "20000", "5"),
("Estates Manager", "40000", "5");
INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Bob", "Smith", "1"),
("Alice", "Jones", "2"),
("Sarah", "Pope", "3"),
("David", "Williams", "4"),
("Laura", "Kane", "5"),
("John", "Adams", "6"),
("Amy", "Tennant", "7"),
("Melody", "Pond", "8"),
("Linda", "Belcher", "9"),
("Terry", "Linn", "10"),
("Matthew", "Mason", "11"),
("Louis", "Green", "12"),
("Elizabeth", "McDonald", "13");
UPDATE employee SET manager_id = 2 WHERE (id = 1);
UPDATE employee SET manager_id = 3 WHERE (id = 2);
UPDATE employee SET manager_id = 6 WHERE (id = 4);
UPDATE employee SET manager_id = 6 WHERE (id = 5);
UPDATE employee SET manager_id = 8 WHERE (id = 7);
UPDATE employee SET manager_id = 9 WHERE (id = 8);
UPDATE employee SET manager_id = 11 WHERE (id = 10);
UPDATE employee SET manager_id = 13 WHERE (id = 12);
UPDATE employee SET manager_id = 13 WHERE (id = 13);