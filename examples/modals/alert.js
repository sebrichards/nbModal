angular.module('demo').component('alert', {

	bindings: {
		message: '<'
	},

	templateUrl: 'modals/alert.html',

	controller: function(nbModal) {

		var ctrl = this;

		ctrl.done = function() {
			nbModal.close();
		}
	}
});