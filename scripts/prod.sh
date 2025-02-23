#!/bin/bash

# Obtiene la raíz del repositorio con git
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# Archivo de Docker Compose para el entorno de producción
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.prod.yml"

# Función para mostrar cómo usar el script
function usage() {
    echo "Uso: $0 {up|down|start|stop|restart}"
    exit 1
}

# Verifica si el archivo de Docker Compose existe
function check_docker_compose_file() {
    if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
        echo "No se encontró el archivo docker-compose.prod.yml en la ruta $DOCKER_COMPOSE_FILE"
        exit 1
    fi
}

# Función para iniciar los servicios
function up() {
    echo "Iniciando los servicios con Docker Compose..."
    docker compose -f $DOCKER_COMPOSE_FILE up -d
}

# Función para detener y eliminar los servicios
function down() {
    echo "Deteniendo los servicios con Docker Compose..."
    docker compose -f $DOCKER_COMPOSE_FILE down
}

# Función para iniciar los servicios detenidos
function start() {
    echo "Iniciando los servicios detenidos con Docker Compose..."
    docker compose -f $DOCKER_COMPOSE_FILE start
}

# Función para detener los servicios sin eliminarlos
function stop() {
    echo "Deteniendo los servicios con Docker Compose..."
    docker compose -f $DOCKER_COMPOSE_FILE stop
}

# Función para reiniciar los servicios
function restart() {
    echo "Reiniciando los servicios con Docker Compose..."
    docker compose -f $DOCKER_COMPOSE_FILE restart
}

# Función principal
function main() {
    # Verifica que el archivo docker-compose exista
    check_docker_compose_file

    # Verifica el primer parámetro y ejecuta el comando adecuado
    case "$1" in
        up)
            up
            ;;
        down)
            down
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        *)
            usage
            ;;
    esac
}

# Llamada a la función principal
main "$1"
