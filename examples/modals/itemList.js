angular.module('demo').component('itemList', {

	bindings: {
		itemsOrig: '<items',
		onListSave: '&'
	},

	templateUrl: 'modals/itemList.html',

	controller: function(nbModal) {

		var ctrl = this;

		ctrl.items = angular.copy(ctrl.itemsOrig); // create a working copy

		ctrl.addItem = function() {
			ctrl.editItem(null);
		}

		ctrl.editItem = function(item) {

			var isNew = item === null;

			nbModal.open('itemEditor', {

				isNew: isNew,

				name: (isNew ? '' : item.name),

				'onSave(name)': function(newName) {

					// Add/update item
					if (isNew)
						ctrl.items.push({ name: newName });
					else
						item.name = newName;

					// Re-open list
					nbModal.open('itemList', {
						items: ctrl.items,
						// NB Apparently just passing 'ctrl.onLastSave' doesn't work
						'onListSave(toSave)': function(toSave) {
							ctrl.onListSave({ toSave: toSave });
						}
					})
				},

				'onCancel()': function() {

					// Re-open list
					nbModal.open('itemList', {
						items: ctrl.items,
						// NB Apparently just passing 'ctrl.onLastSave' doesn't work
						'onListSave(toSave)': function(toSave) {
							ctrl.onListSave({ toSave: toSave });
						}
					})
				}
			})

		}

		ctrl.deleteItem = function(item) {
			var index = ctrl.items.indexOf(item);
			ctrl.items.splice(index, 1);
		}

		ctrl.save = function() {
			ctrl.onListSave({ toSave: ctrl.items });
			nbModal.close();
		}

		ctrl.cancel = function() {
			nbModal.close();
		}

	}
});