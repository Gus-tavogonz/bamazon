DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


DROP TABLE IF EXISTS products;
CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (40) NULL,
department_name VARCHAR (40) NULL,
price DECIMAL (10,2) NULL,
stock_quantity INTEGER NULL,
PRIMARY KEY (id)
);

