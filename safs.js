document.addEventListener('submit', function(e) {
    if (e.target.hasAttribute('data-safs')) {
        e.preventDefault();
		
        var form = e.target;
		
        var action = form.getAttribute('action');
		action = action !== null ? action : window.location.href;
		
		var method = form.getAttribute('method');
		method = method !== null ? ['get', 'post'].indexOf(method.toLowerCase()) >= 0 ? method.toLowerCase() : 'get' : 'get';
		
		if (form.classList.contains('false') || form.hasAttribute('data-safs-during')) {
			return false;
		}

        form.setAttribute('data-safs-during', true);
		
		var filesInput = form.querySelectorAll('input[type=file]');
		
		if(filesInput.length) {
			method = 'post';
		}
		
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		
		xhr.upload.onprogress = function(e) {
			safsTriggerEvent(form, 'safs-progress', Math.round((e.loaded * 100) / e.total));
		}
		
		xhr.onload = xhr.onerror = function() {
			form.removeAttribute('data-safs-during');
			if (xhr.status == 200) {
				if(form.hasAttribute('data-safs-success-reset')) {
					form.reset();
				}
				safsTriggerEvent(form, 'safs-success', xhr);
			} else {
				afTriggerEvent(form, 'safs-error', xhr);
			}
		};
		
		var formData;
		if(method === 'post') {
			formData = new FormData(form);
			xhr.open(method, action);
		} else {
			formData = null;
			xhr.open(method, action + (action.indexOf('?') === -1 ? '?' : '&') + Array.from(new FormData(form), e => e.map(encodeURIComponent).join('=')).join('&'));
		}
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.send(formData);
    }
	
	function safsTriggerEvent(el, eName, data){
		var safsEvent = new CustomEvent(eName, {
			detail: data
		});
		el.dispatchEvent(safsEvent);
	}
});