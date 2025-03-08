#!/bin/bash

# Obtiene la raíz del repositorio con git
PROJECT_ROOT=$(git rev-parse --show-toplevel)

source "$PROJECT_ROOT/scripts/styleText.zsh"

# Archivo de Docker Compose para el entorno de desarrollo
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.dev.yml"

is_linux() {
    if uname -a | grep -iq "Linux"; then
        return 0 # true
    else
        return 1 # false
    fi
}

install_bun() {
    if is_linux; then
        curl -fsSL https://bun.sh/install | bash
    else
        powershell -c "irm bun.sh/install.ps1 | iex"
    fi
}

check_bun() {
    if ! command -v bun >/dev/null; then
        bun="$(printCyan -b bun)"
        printError "No se encontró el comando '$bun'."
        echo

        # Pregunta al usuario si desea instalar bun
        read -rp "¿Deseas instalar '$bun'? (s/n): " response
        if [[ "$response" =~ ^[SsYy]$ ]]; then
            install_bun
            return 0
        fi

        echo
        printInfo
        printInfo "Para instalar '$bun', ejecuta el siguiente comando:"
        printInfo
        printInfo "$(styleText -u -- "Linux"):"
        printInfo
        printInfo "  $(printCommand "curl -fsSL https://bun.sh/install | bash")"
        printInfo
        printInfo "$(styleText -u -- Windows):"
        printInfo
        printInfo "  $(printCommand "powershell -c \"irm bun.sh/install.ps1 | iex\"")"
        printInfo
        printInfo "Después de instalar '$bun', vuelve a ejecutar este script."
        printInfo
        exit 1
    fi
}

check_bun

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
    bun install
    docker_compose_dev up
}

# Función para detener y eliminar los servicios
function down() {
    echo "Deteniendo los servicios con Docker Compose..."
    docker_compose_dev down --volumes
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
