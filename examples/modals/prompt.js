angular.module('demo').component('prompt', {

	bindings: {
		onOk: '&',
		onCancel: '&'
	},

	templateUrl: 'modals/prompt.html',

	controller: function(nbModal) {

		var ctrl = this;

		ctrl.message = 'Hello world!';

		ctrl.ok = function() {

			nbModal.close();

			ctrl.onOk({
				message: ctrl.message
			});
		}

		ctrl.cancel = function() {

			nbModal.close();

			ctrl.onCancel();
		}
	}
});