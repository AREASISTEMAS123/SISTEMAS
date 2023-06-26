Para correr laravel: instalar Composer desde el navegador

una vez instalado: entras al comando y escribes:

composer install

para la base de datos clonas el archivo .env.example y lo renombras solo con .env
puedes importar las tablas o puedes escribir el comando :

php artisan migrate


CONFIG EMAIL : en el .ENV 

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=name@gmail.com
MAIL_PASSWORD=password | generado
MAIL_ENCRYPTION=tsl
MAIL_FROM_ADDRESS=name@gmail.com
MAIL_FROM_NAME=name


