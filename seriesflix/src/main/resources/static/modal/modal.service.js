
angular.
  module('modal').
  service('modalService', ['$mdDialog', function ($mdDialog) {
    var self = this;

    this.mostraAlertaSimples = function(message) {
        const alert = $mdDialog.alert({
            title: 'Atenção',
            textContent: message,
            ok: 'Ok'
        });

        return $mdDialog.show(alert);
    }

    this.confirmarAcao = function(message) {
        const alert = $mdDialog.confirm({
            title: 'Confirmar Ação',
            textContent: message,
            ok: 'Sim',
            cancel: 'Não'
        });

        return $mdDialog.show(alert);
    };
}]);