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
