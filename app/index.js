(function(){
    var chipLinksTest = angular.module('ChipLinksClient', ['chip-links']);

    chipLinksTest.config(function($logProvider){
        $logProvider.debugEnabled(true);
    });

    chipLinksTest.controller('ChipLinksClientCtrl', function($scope, $log) {
        $scope.chipLinkSelectHandler = function(chipLinkId) {
            $log.info("Chip link " + chipLinkId + " has been selected!");
        };
    });
})();
