(function(){
  angular.module('bookToReadSelectModule', []);

  angular.module('bookToReadSelectModule')
  .factory('genreSelect', function() {
        return {
          genreType : [
            {
              name: "all",
              value: "all"
            },
            {
              name: "novel",
              value: "novel"
            },
            {
              name: "detective",
              value: "detective"
            },
            {
              name: "horor",
              value: "horor"
            }
          ]
        };
  });

  angular.module('bookToReadSelectModule')
  .factory('sortSelect', function() {
    return {
     sortType : [
        {
          name: "Alphabetical",
          value: "name"
        },
        {
          name: "Rating Stars",
          value: "-rating_stars"
        }
      ]
    };
  });

})();
