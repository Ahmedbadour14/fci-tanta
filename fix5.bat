@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd server
call npm install prisma@5 @prisma/client@5
call npm uninstall prisma@7 @prisma/client@7
call npx prisma generate
call npx prisma db push
call npx prisma db seed
