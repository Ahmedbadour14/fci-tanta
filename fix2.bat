@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd client
call npm uninstall tailwindcss postcss autoprefixer
call npm install -D tailwindcss @tailwindcss/vite
call npx shadcn@latest init -d
