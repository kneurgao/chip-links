// jshint multistr:true

(function() {
    'use strict';

    var chipLinks = angular.module('chip-links');

    chipLinks.directive('chipLinks', function($log) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: ['$scope', function($scope) {
                $log.debug("Initializing chip-links...");
                $scope.chips = [];

                this.addChip = function(chip) {
                    $log.debug("Adding chipLink " + chip.id + " to chipLinks...");
                    if ($scope.chips.length === 0) {
                        chip.selected = true;
                    }
                    $scope.chips.push(chip);
                };

                this.deselectAll = function() {
                    $log.debug("Deselecting all chip-links...");
                    angular.forEach($scope.chips, function(chip) {
                        chip.selected = false;
                    });
                };
            }],
            template: '\
                <div class="chip-links" ng-transclude>\
                </div>\
            '
        };
    });

    chipLinks.directive('chipLink', function($log) {
        return {
            require: '^chipLinks',
            transclude: true,
            restrict: 'E',
            scope: {
                id: '@',
                chipLinkSelected: '&'
            },
            link: function(scope, element, attrs, chipLinks) {
                $log.debug("Initializing chip-link...");
                chipLinks.addChip(scope);

                scope.select = function() {
                    chipLinks.deselectAll();

                    $log.debug("Selecting chip-link " + scope.id + "...");
                    scope.selected = true;

                    $log.debug("Invoking callback for chipLinkSelected...");
                    scope.chipLinkSelected({ id : scope.id });
                };
            },
            template: '\
                <span class="chip-link" ng-click="select()" ng-class="{ active: selected }">\
                    <ng-transclude></ng-transclude>\
                </span>\
            '
        };
    });
})();
