#!/bin/bash

# Obtiene la raíz del repositorio con git
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# Archivo de Docker Compose para el entorno de desarrollo
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.dev.yml"

# Función para mostrar cómo usar el script
function usage() {
    echo "Uso: $0 {build|up|down|start|stop|restart|lint|format|check}"
    exit 1
}

# Verifica si el archivo de Docker Compose existe
function check_docker_compose_file() {
    if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
        echo "No se encontró el archivo docker-compose.dev.yml en la ruta $DOCKER_COMPOSE_FILE"
        exit 1
    fi
}

function docker_compose() {
    docker compose -f $DOCKER_COMPOSE_FILE "$@"
}

function docker_compose_dev() {
    docker_compose --profile dev "$@"
}

# Función para buildear la imagen de desarrollo
function build() {
    echo "Construyendo la imagen de desarrollo..."
    docker_compose_dev build
}

# Función para iniciar los servicios
function up() {
    echo "Iniciando los servicios con Docker Compose..."
    docker_compose_dev up --renew-anon-volumes --build
}

# Función para detener y eliminar los servicios
function down() {
    echo "Deteniendo los servicios con Docker Compose..."
    docker_compose_dev down --volumes --remove-orphans
}

# Función para iniciar los servicios detenidos
function start() {
    echo "Iniciando los servicios detenidos con Docker Compose..."
    docker_compose_dev start
}

# Función para detener los servicios sin eliminarlos
function stop() {
    echo "Deteniendo los servicios con Docker Compose..."
    docker_compose_dev stop
}

# Función para reiniciar los servicios
function restart() {
    echo "Reiniciando los servicios con Docker Compose..."
    docker_compose_dev restart
}

# Función para ejecutar el linter
function lint() {
    echo "Ejecutando linter con Docker Compose..."
    docker_compose up linter
}

# Función para ejecutar el formateo de código
function format() {
    echo "Ejecutando formateo de código con Docker Compose..."
    docker_compose up format
}

# Función para ejecutar ambos, lint y format
function check() {
    echo "Ejecutando linter y formateo de código con Docker Compose..."
    docker_compose --profile check up
}

# Función principal
function main() {
    # Verifica que el archivo docker-compose exista
    check_docker_compose_file

    # Verifica el primer parámetro y ejecuta el comando adecuado
    case "$1" in
        build)
            build
            ;;
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
        lint)
            lint
            ;;
        format)
            format
            ;;
        check)
            check
            ;;
        *)
            usage
            ;;
    esac
}

# Llamada a la función principal
main "$1"
