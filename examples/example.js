angular.module('demo', ['nbModal'])

	.controller('ExampleCtrl', function(nbModal) {

		var ctrl = this;

		ctrl.items = [{ name: 'a' },{ name: 'b'},{ name: 'c' }];

		ctrl.itemString = function() {
			return ctrl.items.map(function(i) { return i.name }).join(', ');
		}

		ctrl.showAlert = function() {

			nbModal.open('alert', {
				message: 'This modal closes itself!'
			});
		}

		ctrl.showConfirm = function() {

			nbModal.open('confirm', {

				'onDone(value)': function(value) {
					nbModal.close();
					alert('You said: ' + (value ? 'yes' : 'no'));
				}

			});
		}

		ctrl.showPrompt = function() {

			nbModal.open('prompt', {

				'onOk(message)': function(msg) {
					alert('You said: ' + msg);
				},

				'onCancel()': function() {
					alert('You cancelled!');
				},

			});
		}

		ctrl.showSimpleChained = function() {

			nbModal.open('confirm', {

				'onDone(value)': function(value) {

					// Open another!
					nbModal.open('alert', {
						message: 'You said: ' + (value ? 'yes' : 'no')
					});
				}
			});

		}

		ctrl.showComplexChained = function() {

			nbModal.open('itemList', {

				items: ctrl.items,

				'onListSave(toSave)': function(toSave) {
					ctrl.items = toSave;
				}
			});
		}

	});