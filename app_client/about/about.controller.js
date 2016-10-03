(function () {

  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About Loc8r'
    };

    vm.main = {
      content: 'Loc8r was created to help people find places to sit down and get a bit of work done. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed dolor pellentesque, maximus dui at, facilisis purus. Nam ligula risus, ultrices ut leo a, vestibulum posuere leo. Pellentesque at pharetra purus. Aliquam dignissim, lacus in dignissim congue, mi eros volutpat nisl, ut consectetur urna tortor ac leo. Nullam congue egestas nisi pellentesque posuere. Donec feugiat semper augue, sit amet dignissim enim iaculis non. Sed ornare vel sapien sed viverra. Cras arcu ligula, ultricies ac maximus nec, rhoncus a ipsum. Curabitur eget bibendum arcu. Vestibulum eros elit, consequat a hendrerit vel, tincidunt ut enim. Suspendisse at imperdiet turpis. Suspendisse convallis ligula dolor, in luctus lacus gravida id. Nam luctus porttitor metus a molestie. In congue, lorem sit amet varius hendrerit, purus magna ullamcorper justo, id interdum felis ipsum eget ante. \n\n Sed ut leo ornare, semper nisi eu, suscipit nunc. In id mi blandit, laoreet ex nec, egestas tellus. Vivamus non diam mi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae ultricies felis. Vestibulum consequat posuere ligula eget placerat. In luctus magna nec purus auctor congue. Aenean semper nisi lectus, sed dapibus risus pretium eu. Praesent at enim libero. Suspendisse lacinia ipsum et dictum viverra. Suspendisse commodo congue mauris, ultrices accumsan dui volutpat et. Nullam eget sapien at ante convallis sollicitudin porta non eros. Proin diam nulla, placerat nec lorem quis, malesuada rhoncus lorem. Mauris pulvinar, erat id laoreet semper, lorem magna elementum nunc, eu pulvinar lorem mauris at erat. Suspendisse lacinia enim massa, vel luctus enim dignissim pellentesque. \n\n Maecenas vel cursus quam. In ligula quam, tristique vitae varius sit amet, posuere ut leo. Nulla sagittis dictum quam nec vestibulum. Aenean consequat neque vel purus vehicula, eget fringilla nulla pulvinar. Duis eget eros ex. Phasellus congue pellentesque erat, vel dictum magna sodales ut. Suspendisse feugiat quis sapien vel rhoncus. Fusce ut maximus erat. Praesent commodo blandit quam, a vestibulum justo tempor et. Suspendisse sagittis diam a tincidunt efficitur. Donec semper enim sit amet nisl convallis tristique. Curabitur tempor, tortor vel accumsan pretium, mauris urna congue neque, ut mollis est felis a ligula.'
    };

  }
}) ();
