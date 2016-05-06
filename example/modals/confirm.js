angular.module('demo').component('confirm', {

	bindings: {
		onDone: '&'
	},

	templateUrl: 'modals/confirm.html',

	controller: function() {

		// NB Notice that 'nbModal' isn't referenced!

		var ctrl = this;

		ctrl.yes = function() {
			ctrl.onDone({ value: true });
		}

		ctrl.no = function() {
			ctrl.onDone({ value: false });
		}
	}
});