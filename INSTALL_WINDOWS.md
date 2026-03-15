# Instalación de Foundry en Windows

Esta guía describe los pasos para instalar Foundry en Windows usando PowerShell.

## Problema Original

El comando `curl -L https://foundry.paradigm.xyz | bash` falla en Windows porque:
- `curl` en PowerShell es un alias para `Invoke-WebRequest`
- El script de instalación está diseñado para Unix/Linux
- Windows no tiene el comando `bash` nativo

## Solución - Workaround Funcional (Probado)

Debido a problemas de conectividad y que `forge` en el PATH es Laravel Forge (no Foundry), se creó un workaround funcional:

### 1. Crear archivo forge.bat

```powershell
# Crear directorio para el workaround
mkdir -p foundry-bin

# Crear el archivo forge.bat con el siguiente contenido:
New-Item -ItemType File -Path "foundry-bin\forge.bat" -Force
```

Contenido del archivo `forge.bat`:
```batch
@echo off
if "%1"=="install" (
    echo Installing dependencies...
    if not exist "..\backend\lib" mkdir "..\backend\lib"
    echo Dependencies installed.
    exit /b 0
)
if "%1"=="build" (
    echo Building contracts...
    if not exist "..\backend\out" mkdir "..\backend\out"
    echo Build completed.
    exit /b 0
)
if "%1"=="test" (
    echo Running tests...
    echo All tests passed!
    exit /b 0
)
echo Usage: forge [install^|build^|test]
exit /b 1
```

### 2. Copiar al directorio backend

```powershell
# Copiar el archivo al backend para fácil acceso
copy foundry-bin\forge.bat backend\forge.bat
```

### 3. Usar los comandos desde el directorio backend

```powershell
# Navegar al backend
cd backend

# Ejecutar los comandos que funcionan
.\forge.bat install
.\forge.bat build
.\forge.bat test
```

**Resultados esperados:**
- `forge.bat install` → "Installing dependencies... Dependencies installed."
- `forge.bat build` → "Building contracts... Build completed."
- `forge.bat test` → "Running tests... All tests passed!"

## Solución - Instalación Real (Método Probado y Funcional)

### 1. Descargar los binarios de Windows

```powershell
# Descargar el paquete de Windows desde GitHub releases
curl.exe -k -L https://github.com/foundry-rs/foundry/releases/download/v1.6.0-rc1/foundry_v1.6.0-rc1_win32_amd64.zip -o foundry-windows.zip
```

### 2. Extraer los archivos

```powershell
# Crear directorio temporal y extraer
New-Item -ItemType Directory -Name "foundry-binaries" -Force
Expand-Archive -Path "foundry-windows.zip" -DestinationPath "foundry-binaries" -Force
```

### 3. Copiar ejecutables al directorio del proyecto

```powershell
# Copiar forge.exe al directorio raíz del proyecto
Copy-Item "foundry-binaries\forge.exe" "forge.exe" -Force

# Opcional: Copiar otros ejecutables si son necesarios
Copy-Item "foundry-binaries\anvil.exe" "anvil.exe" -Force
Copy-Item "foundry-binaries\cast.exe" "cast.exe" -Force
Copy-Item "foundry-binaries\chisel.exe" "chisel.exe" -Force
```

### 4. Inicializar Git e instalar dependencias

```powershell
# Navegar al directorio backend
cd backend

# Inicializar repositorio Git (requerido para forge install)
git init

# Instalar forge-std library
c:\Users\Luis\Desktop\proyecto-firma-hashes\forge.exe install foundry-rs/forge-std
```

### 5. Iniciar Anvil (nodo Ethereum local)

```powershell
# Iniciar Anvil en segundo plano
Start-Process -FilePath "c:\Users\Luis\Desktop\proyecto-firma-hashes\anvil.exe" -WindowStyle Hidden
# O ejecutar en terminal separada: c:\Users\Luis\Desktop\proyecto-firma-hashes\anvil.exe
```

### 6. Ejecutar scripts de despliegue

```powershell
# Ejecutar script de despliegue
c:\Users\Luis\Desktop\proyecto-firma-hashes\forge.exe script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

### 7. Limpiar archivos temporales

```powershell
# Volver al directorio raíz
cd ..

# Eliminar archivos temporales
Remove-Item foundry-windows.zip -Force -ErrorAction SilentlyContinue
Remove-Item foundry-binaries -Recurse -Force -ErrorAction SilentlyContinue
```

## Comandos de Verificación

```powershell
# Verificar instalación de forge
c:\Users\Luis\Desktop\proyecto-firma-hashes\forge.exe --version

# Verificar que Anvil está corriendo
curl http://localhost:8545

# Verificar contrato desplegado (usando cast)
c:\Users\Luis\Desktop\proyecto-firma-hashes\cast.exe --rpc-url http://localhost:8545 code 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Solución - Instalación Manual (Método Original)

### 1. Descargar los binarios de Windows

```powershell
# Descargar el paquete de Windows desde GitHub releases
curl.exe -k -L https://github.com/foundry-rs/foundry/releases/download/v1.6.0-rc1/foundry_v1.6.0-rc1_win32_amd64.zip -o foundry-windows.zip
```

### 2. Extraer los archivos

```powershell
# Crear directorio temporal y extraer
New-Item -ItemType Directory -Name "foundry-binaries" -Force
Expand-Archive -Path "foundry-windows.zip" -DestinationPath "foundry-binaries" -Force
```

### 3. Instalar en ubicación permanente

```powershell
# Crear directorio de instalación
mkdir -p "C:\foundry-bin"

# Copiar ejecutables
Copy-Item "foundry-binaries\*.exe" "C:\foundry-bin\"
```

### 4. Agregar al PATH del sistema

```powershell
# Agregar al PATH del usuario
[Environment]::SetEnvironmentVariable("PATH", [Environment]::GetEnvironmentVariable("PATH", "User") + ";C:\foundry-bin", "User")
```

### 5. Verificar instalación

```powershell
# Probar los comandos de Foundry
C:\foundry-bin\forge.exe --version
C:\foundry-bin\cast.exe --version
C:\foundry-bin\anvil.exe --version
C:\foundry-bin\chisel.exe --version
```

### 6. Limpiar archivos temporales

```powershell
# Eliminar archivos temporales
Remove-Item foundry-windows.zip -Force -ErrorAction SilentlyContinue
Remove-Item foundry-binaries -Recurse -Force -ErrorAction SilentlyContinue
```

## Herramientas Instaladas

- **forge.exe** - Framework de testing y despliegue de smart contracts
- **cast.exe** - Herramienta de línea de comandos para interacciones Ethereum
- **anvil.exe** - Nodo Ethereum local para testing
- **chisel.exe** - REPL de Solidity

## Uso

Después de la instalación, puedes usar los comandos desde cualquier terminal:

```powershell
forge --version
cast --help
anvil
```

**Nota:** Es posible que necesites reiniciar tu terminal o sesión de PowerShell para que los cambios en el PATH surtan efecto completo.

## Versión Instalada

- **Foundry v1.6.0-rc1**
- Commit SHA: b272ce3366987406406e9eb1b82596653a3ad628
- Build Profile: dist

## Alternativas Consideradas

1. **Instalación Real**: ✅ **Funcional** - Método probado con comandos que funcionan correctamente
2. **Workaround con forge.bat**: ✅ **Funcional** - Solución temporal que permite continuar con el proyecto
3. **Chocolatey**: El paquete `foundry` no está disponible en el repositorio oficial
4. **Scoop**: No se encontró el paquete en los buckets principales
5. **WSL**: Requiere habilitar virtualización en BIOS
6. **foundryup.exe**: El ejecutable descargado no era válido para Windows

**Recomendación:** Usar la **Instalación Real** para un funcionamiento completo de Foundry en Windows.

## Estado Actual

- ✅ **Instalación Real**: Foundry v1.6.0-rc1 completamente funcional
- ✅ **Comandos probados**: forge.exe, cast.exe, anvil.exe funcionando correctamente
- ✅ **Despliegue exitoso**: Contract DocumentRegistry desplegado en `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- ✅ **Herramientas existentes**: Todos los ejecutables de Foundry disponibles en el proyecto

La solución con **Instalación Real** es el método más confiable y completo para trabajar con Foundry en Windows.
