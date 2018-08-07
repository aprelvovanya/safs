# Simple ajax form submit

Простая отправка формы.

1. Подключить jquery 3 и выше
2. Подключить файл safs.jquery.js
3. Форме добавить атрибут `data-safs`
4. Всё готово.

## action
куда слать запрос, если не указан будет использоваться ссылка на текущую страницу

## method
get или post
если не указан - будет get
если в форме есть поле file - будет всегда post

##

Если у формы установлен класс `false` - форма не отправляется

##

Если у формы установлен атребут `data-safs-success-reset` - при успешной отправке формы - форма будет сброшена

##

Если ответ в формате JSON и есть свойство `location` - произойдет редирект

##

При отправке запроса форме добавляется атрибут `data-safs-during`

## Event
В процессе работы форме добавляются события

`safs-success` - форма успешно отправлена

`safs-error` - отшибка отправки

Событиям передаются результаты запроса в свойстве `detail` в виде XHR

`safs-progress` - прогресс отправки формы, можно использовать при отправке файлов

## Пример обработки событий

```
$('form').on('safs-success', function(el, data) {
  console.log(data.responseText);// - ответ сервера
  console.log(data.status);// - код ответа сервера
});
```

```
$('form').on('safs-error', function(el, data) {
  console.log(data.responseText);// - ответ сервера
  console.log(data.status);// - код ответа сервера
});
```

```
$('form').on('safs-progress', function(el, data) {
  console.log(data);// - процент загрузки файлов
});
```
