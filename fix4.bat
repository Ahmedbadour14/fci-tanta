@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd server
call npm install @prisma/client
call npx prisma generate
call npx prisma db push
call npx prisma db seed
