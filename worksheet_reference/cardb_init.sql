create database if not exists ws_sql_worksheet;

create table if not exists ws_sql_worksheet.Car (
  id int primary key auto_increment,
  reg varchar(10),
  make varchar(30),
  model varchar(30),
  year int,
  price decimal(8,2)
);
