angular.module('nbModal', [])

	/** Provider for modal configurtaion */
	.provider('nbModalConfig', function() {

		/** The template (if nay) */
		this.template = null;

		/** The template URL (if any) */
		this.templateUrl = null;

		/** Open the modal */
		this.open = function(element) { /* noop */ }

		/** Close the modal */
		this.close = function(element) { /* noop */ }

		/** Set the element's HTML content, returning the updated element */
		this.setContent = function(element, html) {
			return element.html(html);
		};

		this.$get = function() {
			return this;
		}
	})

	/** Service for interaction */
	.service('nbModal', ['nbModalConfig', '$rootScope', function(config, $rootScope) {

		// NB Simply forwards calls to directive, via events.

		/** Open a modal */
		this.open = function(name, bindings) {
			$rootScope.$broadcast('nbModal:open', {
				name: name,
				bindings: bindings
			});
		}

		/** Close the current modal */
		this.close = function() {
			$rootScope.$broadcast('nbModal:close');
		}

	}])

	/** Directive for all the work */
	.directive('nbModal', ['nbModalConfig', '$compile', function(config, $compile) {

		var directive = {
			restrict: 'E'
		};

		if (config.template != null) // NB coercion
			directive.template = config.template;

		if (config.templateUrl != null) // NB coercion
			directive.templateUrl = config.templateUrl;

		directive.link = function(scope, el) {

			// Component's scope
			var compScope = null;

			// Current state
			var visible = false;

			scope.$on('nbModal:open', function(e, data) {

				// Destroy existing scope
				if (compScope !== null)
					compScope.$destroy();

				// Create a new scope
				compScope = scope.$new();

				// Build HTML
				var html = buildHTML(compScope, data);

				// Add component to DOM
				var compEl = config.setContent(el, html);
				$compile(compEl.contents())(compScope)

				// Open modal
				if (!visible) {
					config.open(el);
					visible = true;
				}
			});

			scope.$on('nbModal:close', function() {

				// Ensure modal exists
				if (compScope !== null) {

					// Close modal
					config.close(el);
					visible = false;

					// Clear current scope
					compScope.$destroy();
					compScope = null;

					// Reset DOM
					var compEl = config.setContent(el, '');
					$compile(compEl.contents())(scope)
				}

			});
		}

		function buildHTML(scope, data) {

			var dashName = dashCase(data.name);

			// Open tag
			var html = '<' + dashName;

			// Add each binding to both the element and scope
			// NB Handles functions using the format: myFunction(a, b, c)
			angular.forEach(data.bindings, function(value, name) {

				if (angular.isFunction(value)) {
					var fnName = name.replace(/ *\([^)]*\)*/g, "");
					html += ' ' + dashCase(fnName) + '="' + name + '"';
					scope[fnName] = value;

				} else {
					html += ' ' + dashCase(name) + '="' + name + '"';
					scope[name] = value;
				}

			});

			// Close tag
			html += '></' + dashName + '>';

			return html;
		}

		function dashCase(str) {
			return str.replace(/[A-Z]/g, function(match) { return '-' + match.toLowerCase(); });
		}

		return directive;
	}]);