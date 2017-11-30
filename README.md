# nbModal

A way to manage modals in an AngularJS application, using `angular.component()`.

This library aims to be framework-agnostic and as flexible as possible.

Check out the demo at https://sebrichards.github.io/nbModal/examples/example.html.

## Features

* Modals are regular components (with bindings!)
* Bring your own modal library (e.g. Bootstrap)
* Simple lifecycle management, using `open()`/`close()`
* Treat modals as navigable, similar to `$location`
* Allow modals to manage themselves, or inject behaviour via functions

## Usage

Include the library and desired adapter:

```html
<script src="nbModal.js"></script>
<script src="nbModal-bootstrap.js"></script>
```

Add the `nbModal` component somewhere (ideally in a top-level template):

```html
<nb-modal></nb-modal>
```

Define your modal as a regular component:

```javascript
component('myModal', {
	bindings: {
		label: '<',
		onDone: '&'
	},
	template: '<button ng-click="$ctrl.onDone()">{{$ctrl.label}}</button>'
});
```

Trigger your modal:

```javascript
controller('root', function(nbModal) {
	this.loadModal = function() {
		nbModal.open('myModal', {
			label: 'Click me!',
			'onDone()': function() {
				nbModal.close();
				// ...etc
			}
		});
	}
});
```

See `examples/` for more.

## Framework Support

The following framework configurations are included in `src/`:

* Bootstrap
  * Modals should provide their own `<div class="modal-content"></div>`
  * Avoid using `data-dismiss`, since the plugin doesn't listen for it.

Feel free to contribute other implementations!

## API

Simply add the `nbModal` dependency to wherever you need it.

### `open(componentName, bindings)`

Open a modal.

| Parameter              | Type     | Details                                                     |
|------------------------|----------|-------------------------------------------------------------|
| componentName          | `string` | Name of the component to show as a modal.<br>e.g. `myModal` |
| bindings<br>(optional) | `object` | Key/value map containing any component bindings.<br><br>For function bindings, use the format:<br>`'myFunction(a, b)': function(a, b) {}` |

### `close()`

Close the current modal.

## Configuration

To support different frameworks, a number of properties in `nbModalConfig` should be overridden.

For a practical example of how this works, see `src/nbModal-bootstrap.js`.

| Property                        | Type       | Details                                                                                            |
|---------------------------------|------------|----------------------------------------------------------------------------------------------------|
| template/templateUrl (optional) | `string`   | Wrapping template for modals. Useful for DRY modal templates.                                      |
| open(el)                        | `function` | Open the modal, using the chosen framework.<br>`el` is the component's DOM element.                |
| close(el)                       | `function` | Close the modal, using the chosen framework.<br>`el` is the component's DOM element.               |
| setContent(el, html)            | `function` | Place the provided HTML in the correct element, returning that updated element.<br>Intended for use with `template`/`templateUrl`. |

## Notes

* Only one modal is visible at any given time
* If a modal is already visible when another is loaded, the former is replaced

## Known Issues

* If you don't provide a wrapping template, `nbModalConfig.open()` is called before the DOM is ready. Using `$timeout` doesn't seem to always work.
* Passing function bindings (with parameters) by reference between modals is troublesome. Workaround is to wrap in another function - see `examples/itemList.js`.
