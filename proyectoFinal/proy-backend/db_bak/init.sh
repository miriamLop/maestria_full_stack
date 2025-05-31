#!/bin/bash
set -e

echo "Esperando que PostgreSQL esté listo..."

until pg_isready -h dbpostgresql -p 5432 -U "$POSTGRES_USER"; do
    sleep 2
done

echo "Creando base de datos temporal"
psql -h dbpostgresql -U "$POSTGRES_USER" -c "CREATE DATABASE app_db;"
echo "Creacion completa"
echo "Restaurando base de datos..."
pg_restore -h dbpostgresql --no-owner --no-privileges -d "$POSTGRES_DB" -U "$POSTGRES_USER" /copia.backup

echo "Restauración completada."
