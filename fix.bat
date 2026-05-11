@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd client
call npm install -D tailwindcss@3 postcss autoprefixer
call npx tailwindcss init -p
call npm i -D @types/node
call npx shadcn@latest init -d
