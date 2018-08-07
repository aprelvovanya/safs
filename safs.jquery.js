(function($) {
  $(function() {
    $(document).on('submit', '[data-safs]', function(e) {
      e.preventDefault();
      var form = $(this);

      var action = form.attr('action');
      action = action !== undefined ? action : window.location.href;

      var method = form.attr('method');
      method = method !== undefined ? ['get', 'post'].indexOf(method.toLowerCase()) >= 0 ? method.toLowerCase() : 'get' : 'get';

      if (form.is('.false') || form.is('[data-safs-during]'))
        return false;

      form.attr('data-safs-during', true);

      var isFiles = !!form.find('[type=file]').length;
      var formData;
      if (isFiles) {
        method = 'post';
        formData = new FormData(form[0]);
      } else {
        formData = form.serializeArray();
      }

      $.ajax({
        data: formData,
        method: method,
        url: action,
        async: true,
        cache: false,
        contentType: false,
        processData: !isFiles,
        xhr: function() {
          var jqXHR = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");

          jqXHR.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
              form.trigger('safs-progress', [Math.round((e.loaded * 100) / e.total)]);
            }
          }, false);
          return jqXHR;
        }
      }).done(function(response, textStatus, jqXHR) {
        var isJSON = true;
        try {
          var r = $.parseJSON(jqXHR.responseText);
        } catch (err) {
          isJSON = false;
        }
        if (isJSON) {
          jqXHR.responseText = r;
          if (jqXHR.responseText.location !== undefined) {
            form.addClass('false');
            window.location = jqXHR.responseText.location;
          }
        }
        form.trigger('safs-success', [jqXHR]);
        if (form.is('[data-safs-success-reset]')) {
          form[0].reset();
        }
      }).fail(function(jqXHR) {
        form.trigger('safs-error', [jqXHR]);
      }).always(function() {
        form.attr('data-safs-during', null);
      });
    });
  });
})(jQuery);
