#!/bin/bash

# Obtiene la raíz del repositorio con git
PROJECT_ROOT=$(git rev-parse --show-toplevel)

source "$PROJECT_ROOT/scripts/styleText.zsh"
source "$PROJECT_ROOT/scripts/fzf.zsh"

# Archivo de Docker Compose para el entorno de producción
DOCKER_COMPOSE_FILE="compose.prod.yml"
DOCKER_COMPOSE_PATH="$(realpath $(dirname $0))/$DOCKER_COMPOSE_FILE"
export COMPOSE_BAKE=true

commands() {
    {
        echo "  $(logCyan "build")   @ Construye la imagen de desarrollo"
        echo "  $(logCyan "up")      @ Inicia todos los servicios"
        echo "  $(logCyan "down")    @ Detiene y elimina los servicios y volúmenes"
        echo "  $(logCyan "start")   @ Inicia servicios detenidos"
        echo "  $(logCyan "stop")    @ Detiene los servicios sin eliminarlos"
        echo "  $(logCyan "restart") @ Reinicia todos los servicios"
        echo "  $(logCyan "help")    @ Muestra esta ayuda"
    } | column -t -s "@"
}

# Función para mostrar cómo usar el script
function usage() {
    echo "$(styleText -u "Uso"): $0 COMANDO"
    echo
    echo "$(styleText -u "Comandos disponibles"):"
    echo
    commands
    exit 1
}

# Verifica si el archivo de Docker Compose existe
function check_docker_compose_file() {
    if [ ! -f "$DOCKER_COMPOSE_PATH" ]; then
        logError "No se encontró el archivo $(logCyan -u $DOCKER_COMPOSE_FILE) en la ruta $(logCyan -u "$(dirname $DOCKER_COMPOSE_PATH)")"
        exit 1
    fi
}

function docker_compose() {
    docker compose -f $DOCKER_COMPOSE_PATH "$@"
}

# Función para buildear la imagen de producción
function build() {
    logInfo "Construyendo la imagen de producción..."
    docker_compose build
}

# Función para iniciar los servicios
function up() {
    logInfo "Iniciando los servicios con Docker Compose..."
    docker_compose up -d
}

# Función para detener y eliminar los servicios
function down() {
    logInfo "Deteniendo los servicios con Docker Compose..."
    docker_compose down --volumes --remove-orphans
}

# Función para iniciar los servicios detenidos
function start() {
    logInfo "Iniciando los servicios detenidos con Docker Compose..."
    docker_compose start
}

# Función para detener los servicios sin eliminarlos
function stop() {
    logInfo "Deteniendo los servicios con Docker Compose..."
    docker_compose stop
}

# Función para reiniciar los servicios
function restart() {
    logInfo "Reiniciando los servicios con Docker Compose..."
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
    help)
        usage
        ;;
    *)
        logError "Comando no encontrado: '$(logCyan -b -- "$1")'"
        logInfo "Ejecutando el script interactivo..."
        if command -v fzf >/dev/null; then
            cmd=$(commands | fzf --header="Selecciona un comando con ENTER para confirmar" --prompt="Selecciona un comando > ")
            if [ -n "$cmd" ]; then
                main "$(echo "$cmd" | awk '{print $1}')"
            else
                usage
            fi
            exit 0
        fi
        usage
        ;;
    esac
}

# Llamada a la función principal
main "$1"
