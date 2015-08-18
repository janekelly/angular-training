var myApp = angular.module('myApp', []);

myApp.controller('GreetingController', ['$scope', 
	function($scope) {
		$scope.greeting = "Hello World"
	}
]);

myApp.controller('NameController', ['$scope',
	function($scope) {
		$scope.names = ['Larry', 'Curly', 'Moe'];
		$scope.addName = function() {
			$scope.names.push($scope.enteredName);
			$scope.enteredName = "";
		}
		$scope.removeName = function(name) {
			var i = $scope.names.indexOf(name);
			$scope.names.splice(i, 1);
		}
	}
]);

myApp.controller('SvgController', ['$scope', 
	function($scope) {
		var encodedData, url, svg;

		$scope = {
			minrad: 5,
			maxrad: 12,
			mincircs: 3,
			maxcircs: 40,
			minopacity: 0.2,
			maxopacity: 0.8,
			hue: 100,
			minsat: 20,
			maxsat: 70,
			minlum: 20,
			maxlum: 70,
			minblur: 1.5,
			maxblur: 3,
			blurvariants: 3
		}

		var randomFloat = function (min, max) {
			return (Math.random() * (max - min) + min).toFixed(2);
		}

		var randomRange = function (min, max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		}

		var createSvg = function () {
			svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">';

			svg += '<defs>';
				for (var i=0; i<=$scope.blurvariants; i++) {
					svg += '<filter id="bokeh' + i + '">';
					svg += '<feGaussianBlur stdDeviation="' + randomFloat($scope.minblur, $scope.maxblur) + '"></feGaussianBlur>';
					svg += '</filter>';
				}
			svg += '</defs>';
				for (var i=1; i<randomRange($scope.mincircs, $scope.maxcircs); i++) {
					svg += '<circle ';
					svg += 'r="' + randomRange($scope.minrad, $scope.maxrad) + '%" ';
					svg += 'cx="' + randomRange(0, 100) + '%" ';
					svg += 'cy="' + randomRange(0, 100) + '%" ';
					svg += 'fill="hsla(' + $scope.hue + ', ' + randomRange($scope.minsat, $scope.maxsat) + '%, ';
					svg += randomRange($scope.minlum, $scope.maxlum) + '%, ';
					svg += randomFloat($scope.minopacity, $scope.maxopacity) + ')"';
					svg += ' filter="url(#bokeh' + randomRange(0, $scope.blurvariants) + ')"';
					svg += '></circle>';
				}
			svg += '</svg>';
			return svg;
		}

		var appendSvg = function (svg) {
			encodedData = window.btoa(svg);
			url = "data:image/svg+xml;base64," + encodedData;
			document.body.style.backgroundImage = "url(" + url + ")";
		}
		
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].getAttribute("type") == "range") {
				inputs[i].onchange = function () {
					appendSvg(createSvg());
				}
			}
		}

		appendSvg(createSvg());
	}
]);
