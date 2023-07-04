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


Error.Log

GD Library extension not available with this PHP installation:
ingresa al panel de control de Xampp - en admin de Apache entrar en php.ini
buscar "extension=gd" y quitar el ";" que tiene por delante luego reinicia el apache y mysql
por ultimo ingresar los siguientes comando:
php artisan route:clear
php artisan cache:clear
php artisan optimize:clear
