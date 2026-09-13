@echo off
setlocal

set "SCRIPT=%~dp0tools\generate_visual_qa.py"
set "BUNDLED_PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if exist "%BUNDLED_PYTHON%" (
  "%BUNDLED_PYTHON%" "%SCRIPT%"
) else (
  where py >nul 2>nul
  if not errorlevel 1 (
    py -3 "%SCRIPT%"
  ) else (
    where python >nul 2>nul
    if errorlevel 1 (
      echo ERROR: Python 3 nebyl nalezen.
      set "EXIT_CODE=1"
      goto done
    )
    python "%SCRIPT%"
  )
)

set "EXIT_CODE=%ERRORLEVEL%"

:done
echo.
if "%EXIT_CODE%"=="0" (
  echo Visual QA galerie byly uspesne vygenerovany.
) else (
  echo Generovani skoncilo chybou. Zkontroluj report vyse.
)
pause
exit /b %EXIT_CODE%
