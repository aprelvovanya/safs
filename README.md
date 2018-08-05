# Simple ajax form submit

Простая отправка формы.

1. Подключить файл safs.js
2. Форме добавить атрибут `data-safs`
3. Всё готово.

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

При отправке запроса форме добавляется атрибут `data-safs-during`

## Event
В процессе работы форме добавляются события

`safs-success` - форма успешно отправлена

`safs-error` - отшибка отправки

Событиям передаются результаты запроса в свойстве `detail` в виде XHR

`safs-progress` - прогресс отправки формы, можно использовать при отправке файлов

## Пример обработки событий

### plain js

```
document.querySelector('form').addEventListener('safs-success', function(data) {
  console.log(data.detail.responseText);// - ответ сервера
  console.log(data.detail.status);// - код ответа сервера
});
```

```
document.querySelector('form').addEventListener('safs-error', function(data) {
  console.log(data.detail.responseText);// - ответ сервера
  console.log(data.detail.status);// - код ответа сервера
});
```

```
document.querySelector('form').addEventListener('safs-progress', function(data) {
  console.log(data.detail);// - процент загрузки файлов
});
```

### jQuery
 
```
$('form').on('safs-success', function(data) {
  console.log(data.detail.responseText);// - ответ сервера
  console.log(data.detail.status);// - код ответа сервера
});
```

```
$('form').on('safs-error', function(data) {
  console.log(data.detail.responseText);// - ответ сервера
  console.log(data.detail.status);// - код ответа сервера
});
```

```
$('form').on('safs-progress', function(data) {
  console.log(data.detail);// - процент загрузки файлов
});
```
