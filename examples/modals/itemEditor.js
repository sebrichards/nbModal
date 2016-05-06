angular.module('demo').component('itemEditor', {

	bindings: {
		isNew: '<',
		name: '<',
		onSave: '&',
		onCancel: '&'
	},

	templateUrl: 'modals/itemEditor.html',

	controller: function(nbModal) {

		var ctrl = this;

		ctrl.save = function() {
			ctrl.onSave({ name: ctrl.name });
		}

		ctrl.cancel = function() {
			ctrl.onCancel();
		}

	}
});