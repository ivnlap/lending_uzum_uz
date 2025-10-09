# Инструкция по развертыванию

## Обзор изменений

Проект настроен для поддержки двух языковых версий через отдельные HTML файлы:
- `/ru` → `index.html` (русская версия)
- `/uz` → `index.uz.html` (узбекская версия)
- `/` → редирект на `/ru`

## Структура сборки

После выполнения `npm run build` в папке `dist/` создаются:
- `index.html` - русская версия (с атрибутом `data-lang="ru"`)
- `index.uz.html` - узбекская версия (с атрибутом `data-lang="uz"`)
- `assets/` - общие JS и CSS файлы
- `images/`, `fonts/` - статические ресурсы

## Как это работает

1. **Vite multi-page build**: конфигурация в `vite.config.ts` создает два входных файла
2. **i18n инициализация**: файл `src/i18n/index.ts` определяет язык из атрибута `data-lang` на HTML элементе
3. **Переключение языков**: работает через кнопки в интерфейсе, сохраняется в localStorage

## Развертывание на сервере

### 1. Сборка проекта

```bash
npm install
npm run build
```

### 2. Копирование файлов на сервер

Скопируйте содержимое папки `dist/` в `/var/www/couriers/` на сервере:

```bash
scp -r dist/* user@server:/var/www/couriers/
```

### 3. Конфигурация nginx

Используйте предоставленную конфигурацию из `nginx.conf.example`:

```nginx
server {
  listen 8080;

  server_name courier.local courier.dev.ufood.uz courier.stable.ufood.uz www.courier.uzumtezkor.uz courier.uzumtezkor.uz;

  root /var/www/couriers;
  index index.html;

  location / {
         try_files $uri $uri/  =404;
  }

  location = / {
        absolute_redirect off;
         return 301 /ru$is_args$args;
  }

  location = /ru {
         try_files $uri $uri/ /index.html =404;
  }

  location = /uz {
       try_files $uri $uri/ /index.uz.html =404;
  }
}
```

### 4. Перезапуск nginx

```bash
sudo nginx -t  # проверка конфигурации
sudo systemctl reload nginx
```

## Проверка работы

1. **Главная страница**: `http://your-domain/` → должен быть редирект на `/ru`
2. **Русская версия**: `http://your-domain/ru` → отобразится русский интерфейс
3. **Узбекская версия**: `http://your-domain/uz` → отобразится узбекский интерфейс

## Особенности

- **SEO-friendly**: каждый язык имеет отдельный URL
- **Переключение языков**: работает через кнопки RU/UZ в интерфейсе
- **Общие ресурсы**: JS и CSS файлы общие для обеих версий, оптимизация размера
- **Сохранение выбора**: выбранный язык сохраняется в localStorage

## Разработка

Для локальной разработки:

```bash
npm run dev  # запуск dev сервера
```

Приложение откроется на `http://localhost:5173/`. По умолчанию будет использован русский язык, который можно переключить через интерфейс.

## Структура проекта

```
.
├── index.html          # Русская версия (исходник)
├── index.uz.html       # Узбекская версия (исходник)
├── vite.config.ts      # Конфигурация multi-page build
├── src/
│   ├── i18n/
│   │   ├── index.ts    # Конфигурация i18next с определением языка
│   │   ├── ru.json     # Переводы на русский
│   │   └── uz.json     # Переводы на узбекский
│   └── ...
└── dist/               # Результат сборки (создается при build)
    ├── index.html      # Русская версия (собранная)
    ├── index.uz.html   # Узбекская версия (собранная)
    └── assets/         # JS и CSS файлы
```

## Troubleshooting

### Язык не переключается
- Проверьте, что атрибут `data-lang` присутствует на `<html>` элементе
- Очистите кеш браузера и localStorage

### 404 на статических ресурсах
- Убедитесь, что путь `root` в nginx указывает на правильную директорию
- Проверьте права доступа к файлам: `chmod -R 755 /var/www/couriers/`

### Редирект не работает
- Проверьте nginx конфигурацию: `sudo nginx -t`
- Убедитесь, что `location = /` настроен правильно
