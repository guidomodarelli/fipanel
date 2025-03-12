#!/bin/bash

# Obtiene la raíz del repositorio con git
PROJECT_ROOT=$(git rev-parse --show-toplevel)

source "$PROJECT_ROOT/scripts/styleText.zsh"

# Archivo de Docker Compose para el entorno de producción
DOCKER_COMPOSE_FILE="compose.prod.yml"
DOCKER_COMPOSE_PATH="$(realpath $(dirname $0))/$DOCKER_COMPOSE_FILE"
export COMPOSE_BAKE=true

# Función para mostrar cómo usar el script
function usage() {
    printInfo "$(styleText -u "Uso"): $0 COMANDO"
    printInfo
    printInfo "$(styleText -u "Comandos disponibles"):"
    printInfo
    {
        printInfo "  $(printCyan "build")   @ Construye la imagen de desarrollo"
        printInfo "  $(printCyan "up")      @ Inicia todos los servicios"
        printInfo "  $(printCyan "down")    @ Detiene y elimina los servicios y volúmenes"
        printInfo "  $(printCyan "start")   @ Inicia servicios detenidos"
        printInfo "  $(printCyan "stop")    @ Detiene los servicios sin eliminarlos"
        printInfo "  $(printCyan "restart") @ Reinicia todos los servicios"
    } | column -t -s "@"
    exit 1
}

# Verifica si el archivo de Docker Compose existe
function check_docker_compose_file() {
    if [ ! -f "$DOCKER_COMPOSE_PATH" ]; then
        printError "No se encontró el archivo $(printCyan -u $DOCKER_COMPOSE_FILE) en la ruta $(printCyan -u "$(dirname $DOCKER_COMPOSE_PATH)")"
        exit 1
    fi
}

function docker_compose() {
    docker compose -f $DOCKER_COMPOSE_PATH "$@"
}

# Función para buildear la imagen de producción
function build() {
    printInfo "Construyendo la imagen de producción..."
    docker_compose build
}

# Función para iniciar los servicios
function up() {
    printInfo "Iniciando los servicios con Docker Compose..."
    docker_compose up -d
}

# Función para detener y eliminar los servicios
function down() {
    printInfo "Deteniendo los servicios con Docker Compose..."
    docker_compose down --volumes --remove-orphans
}

# Función para iniciar los servicios detenidos
function start() {
    printInfo "Iniciando los servicios detenidos con Docker Compose..."
    docker_compose start
}

# Función para detener los servicios sin eliminarlos
function stop() {
    printInfo "Deteniendo los servicios con Docker Compose..."
    docker_compose stop
}

# Función para reiniciar los servicios
function restart() {
    printInfo "Reiniciando los servicios con Docker Compose..."
    docker_compose restart
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
    *)
        usage
        ;;
    esac
}

# Llamada a la función principal
main "$1"
