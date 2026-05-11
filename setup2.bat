@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd client
call npx tailwindcss init -p
call npx shadcn@latest init -d
