(function ($) {
  $(function () {
    $(document).on('submit', '[data-safs]', function (e) {
      e.preventDefault();
      var safsForm = $(this);
      var safsBody = $('body');

      var action = safsForm.attr('action');
      action = action !== undefined ? action : window.location.href;

      var method = safsForm.attr('method');
      method = method !== undefined ? ['get', 'post'].indexOf(method.toLowerCase()) >= 0 ? method.toLowerCase() : 'get' : 'get';

      var xhr = safsForm.is('[data-safs-xhr]');

      var successBody = safsForm.attr('data-safs-success-body');
      successBody = successBody !== undefined ? successBody : '';

      var successForm = safsForm.attr('data-safs-success-form');
      successForm = successForm !== undefined ? successForm : '';

      if (safsForm.is('.false') || safsForm.is('[data-safs-during]')) {
        return false;
      }

      safsForm.attr('data-safs-during', true);

      var isFiles = !!safsForm.find('[type=file]').length;
      var formData;
      if (isFiles) {
        method = 'post';
        formData = new FormData(safsForm[0]);
      } else {
        formData = safsForm.serializeArray();
      }

      $.ajax({
        data: formData,
        method: method,
        url: action,
        async: true,
        cache: false,
        contentType: false,
        processData: !isFiles,
        xhr: function () {
          var jqXHR = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");

          jqXHR.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
              safsForm.trigger('safs-upload-progress', [Math.round((e.loaded * 100) / e.total)]);
            }
          }, false);
          return jqXHR;
        }
      }).done(function (response, textStatus, jqXHR) {
        var isJSON = true;
        try {
          var r = $.parseJSON(jqXHR.responseText);
        } catch (err) {
          isJSON = false;
        }
        if (isJSON) {
          jqXHR.responseText = r;
          if (jqXHR.responseText.location !== undefined) {
            safsForm.addClass('false');
            window.location = jqXHR.responseText.location;
          }
        }
        safsForm.trigger('safs-success', [xhr ? jqXHR : jqXHR.responseText]);
        dataTr(safsForm, successForm, xhr ? jqXHR : jqXHR.responseText);
        if (safsBody.length) {
          dataTr(safsBody, successBody, xhr ? jqXHR : jqXHR.responseText);
        }
        if (safsForm.is('[data-safs-success-reset]')) {
          safsForm[0].reset();
        }
      }).fail(function (jqXHR) {
        safsForm.trigger('safs-error', [xhr ? jqXHR : jqXHR.responseText]);
      }).always(function () {
        safsForm.attr('data-safs-during', null);
      });
    });

    var dataTr = function (target, tr, data) {
      if (tr.length) {
        tr = tr.split(' ');
        if (tr.length) {
          tr.forEach(function (t) {
            if (t) {
              target.trigger(t, [data]);
            }
          });
        }
      }
    };
  });
})(jQuery);