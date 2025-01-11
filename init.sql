CREATE DATABASE IF NOT EXISTS glycemic_control;

USE glycemic_control;

CREATE TABLE IF NOT EXISTS register_level (
  id VARCHAR(36) PRIMARY KEY,
  type VARCHAR(10) NOT NULL,
  level INT NOT NULL,
  register_date VARCHAR(10),
  rate VARCHAR(10),
  color_rate VARCHAR(10)
);
