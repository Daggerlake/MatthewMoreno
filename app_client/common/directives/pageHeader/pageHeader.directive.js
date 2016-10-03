(function () {

  angular
    .module('loc8rApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    return {
      restrict : 'EA',
      // define isolate scope, passing through content object
      scope: {
        content : '=content'
      },
      templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
    };
  }
}) ();
