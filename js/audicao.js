document.addEventListener('DOMContentLoaded', function () {
  var botoesAlerta = document.querySelectorAll('[data-tipo-alerta]');
  var textoAlerta = document.getElementById('texto-alerta-visual');

  var mensagens = {
    campainha: '[LUZ PISCANDO + VIBRACAO]: Campainha da porta principal acionada.',
    despertador: '[VIBRACAO NO PULSO 07:00]: Despertador silencioso ativado.',
    chamada: '[PAINEL VISUAL]: Senha A-042 chamada para o Consultorio 3.'
  };

  for (var i = 0; i < botoesAlerta.length; i++) {
    botoesAlerta[i].addEventListener('click', function () {
      var tipo = this.getAttribute('data-tipo-alerta');

      for (var j = 0; j < botoesAlerta.length; j++) {
        botoesAlerta[j].setAttribute('aria-pressed', 'false');
      }
      this.setAttribute('aria-pressed', 'true');

      textoAlerta.textContent = mensagens[tipo];
      anunciarLeitorDeTela(mensagens[tipo]);
    });
  }
});
