DB_NAME="xramile"
DB_USER="xramile"
DB_PASSWORD="xramile"

psql -U postgres -c "CREATE DATABASE $DB_NAME;"

psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

psql -U postgres -d $DB_NAME -c "GRANT USAGE, CREATE ON SCHEMA public TO $DB_USER;"

psql -U postgres -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;"

