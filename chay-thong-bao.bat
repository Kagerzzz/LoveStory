@echo off
title LoveStory Web Push Daemon
cd /d "%~dp0"
echo ===================================================
echo   LOVESTORY REALTIME WEB PUSH DAEMON
echo   Tu dong gui thong bao den iPhone khi co loi nhan moi!
echo ===================================================
echo.
node push-listener.js
pause
