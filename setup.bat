@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
cd server
call npm init -y
call npm i express cors dotenv helmet morgan multer nodemailer jsonwebtoken bcryptjs sqlite3 swagger-ui-express
call npm i -D typescript @types/node @types/express @types/cors @types/multer @types/nodemailer @types/jsonwebtoken @types/bcryptjs @types/morgan @types/swagger-ui-express tsx prisma ts-node
call npx tsc --init
call npx prisma init --datasource-provider sqlite
cd ..
mkdir client
cd client
call npm create vite@latest . -- --template react-ts -y
call npm i react-router-dom axios framer-motion lucide-react i18next react-i18next i18next-browser-languagedetector
call npm i -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
