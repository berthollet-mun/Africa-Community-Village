-- Execute these statements as a database administrator after replacing the placeholders.
-- Never commit the real passwords.

CREATE USER IF NOT EXISTS 'acv_app'@'%' IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
CREATE USER IF NOT EXISTS 'acv_migration'@'%' IDENTIFIED BY 'REPLACE_WITH_ANOTHER_LONG_RANDOM_PASSWORD';

GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON `acv`.* TO 'acv_app'@'%';
GRANT ALL PRIVILEGES ON `acv`.* TO 'acv_migration'@'%';
FLUSH PRIVILEGES;
