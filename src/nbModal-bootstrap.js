/** Configure nbModal for Bootstrap */
angular.module('nbModal').config(['nbModalConfigProvider', function(config) {

	config.template = '<div class="modal"><div class="modal-dialog"></div></div>';

	config.open = function(element) {
		element.find('div.modal').modal({
			backdrop: 'static',
			show: true,
			keyboard: false
		});
	}

	config.close = function(element) {
		element.find('div.modal').modal('hide');
	}

	config.setContent = function(element, html) {
		return element.find('div.modal-dialog').html(html);
	}

}]);