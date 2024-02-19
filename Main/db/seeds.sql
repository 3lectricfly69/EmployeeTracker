INSERT INTO department (department_name)
VALUES
("Engineering"),
('Marketing'),
('Accounting'),
('Human Resources'),
('Administration');

INSERT INTO roletable (title, salary, department_id)
VALUES
('Engineer', 85000.00, 1),
('Lead Engineer', 93000.00, 1),
('Marketing Coordinator', 60000.00, 2), 
('PR Specialist', 64000.00, 2),
('Accountant', 85000.00, 3),
('CFO', 1000000.00, 3),
('HR Administrator', 60000.00, 4),
('CEO', 110000, 5);

INSERT INTO employee (first_name, last_name, roletable_id, supervisor_id)
VALUES ('Duncan','Trussell', 8, 1),
        ('Laney','Orton', 1, 10),
        ('Amber','Horwits', 3, 4),
        ('Anderson','Greer', 5, 6),
        ('Allison','Binkley', 5, 6),
        ('Keith','Foster', 6, 1),
        ('Darwin', 'Lusk', 1, 10),
        ('Dakota','Kimbro', 4, 1),
        ('Morgen','Hendren', 1, 10),
        ('Lennon','Snyder', 2, 1),
        ('Jude','Hurst', 3, 8),
        ('Vector','Hakim', 1, 10),
        ('Amir','Mashayekhi', 1, 10),
        ('Marcus','Rivera', 7, 1),
        ('Esther','Dockery', 7, 1);
        
        -- self join, create aliases, e1/e2, 

-- 15 total employees - 8 job roles -- 5 engineers, 1 lead engineer, 2 marketing coordinators, 
-- 1 pr specialist, 2 accountants, 1 CFO, 2 HR admins, 1 CEO