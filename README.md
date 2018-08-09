# Простая AJAX отправка форм (Simple ajax form submit)
Простая и легко расширяемая отправка форм без обновления станицы. Поддреживается отправка файлов, вывод прогрессбара и отработка событий по этапам работы. Нет валидации, только отправка и приём ответа.

## Установка
```sh
npm i safs
```
**jQuery >= 3**
```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/safs.jquery.js"></script>
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

`action` [url]
куда слать запрос, если не указан будет использоваться ссылка на текущую страницу

`method` [get|post]
по умолчанию get, если в форме есть поле file - будет post не зависимо от значения

`class="false"`
если у формы установлен класс `false` то отправка не произойдет

`data-safs-success-reset`
при успешной отправке формы - форма будет сброшена

## Процесс отправки
При отправке запроса форме добавляется атрибут `data-safs-during`, после получения ответа - удаляется

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
