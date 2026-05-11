@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd server
call npx prisma generate
call npx prisma db push
call npx prisma db seed
