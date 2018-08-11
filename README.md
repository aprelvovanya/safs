# Простая AJAX отправка форм (Simple ajax form submit)

Простая и легко расширяемая отправка форм без обновления станицы. Поддреживается отправка файлов, вывод прогрессбара и отработка событий по этапам работы. Нет валидации, только отправка и приём ответа.

## Установка

```sh
npm i safs
```

jQuery >= 3

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/safs.jquery.min.js"></script>
```

## Простой пример

```html
<form action="/path/to/target/" data-safs>
    <input type="text" name="name"/>
    <input type="file" name="file"/>
    <input type="submit" value="Отправить"/>
</form>
```

## Атрибуты формы

`data-safs`

подключение обработчика

`action`

[url] - куда слать запрос, если не указан будет использоваться ссылка на текущую страницу

`method`

[get|post] - по умолчанию get, если в форме есть поле file - будет post не зависимо от значения

`class="false"`

если у формы установлен класс `false` то отправка не произойдет

`data-safs-success-reset`

при успешной отправке формы - форма будет сброшена

`data-safs-success-body`

`data-safs-success-form`

список событий разделенных пробелом которые буду выполнены на тег `body` или `саму форму` в случае успешной отправке формы, событию передаётся ответ сервера `responseText`

```html
<form data-safs data-safs-success-body="body-event-1 body-event-2 ...">
```

```js
$('body').on('body-event-1', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

```js
$('body').on('body-event-2', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

```html
<form data-safs data-safs-success-form="form-event-1 form-event-2 ...">
```

```js
$('form-selector').on('form-event-1', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

```js
$('form-selector').on('form-event-2', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

## Процесс отправки

Перед отправкой запроса форме добавляется атрибут `data-safs-during`, после получения ответа или ошибки атрибут удаляется

## События

В процессе работы на форму навешиваются события:

`safs-success`

форма успешно отправлена, срабатывает 1 раз

```js
$('form').on('safs-success', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

`safs-error`

отшибка отправки, срабатывает 1 раз

```js
$('form').on('safs-error', function(el, data) {
    // ответ сервера responseText
    console.log(data);
});
```

`safs-upload-progress`

прогресс отправки формы, можно использовать при отправке файлов для создания прогресс бара, срабатывает множество раз

```js
$('form').on('safs-upload-progress', function(el, data) {
    // процент отправки формы от 0 до 100
    console.log(data);
});
```

## Ответ

Если ответ в формате JSON и есть свойство `location` - произойдет редирект на указанную страницу

```json
{"location": "http://grogl.net"}
```
