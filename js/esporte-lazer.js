document.addEventListener('DOMContentLoaded', function () {
  var btnSwitchA = document.getElementById('botao-acionador-a');
  var btnSwitchB = document.getElementById('botao-acionador-b');
  var caixaStatus = document.getElementById('texto-status-acionador');

  btnSwitchA.addEventListener('click', function () {
    btnSwitchA.setAttribute('aria-pressed', 'true');
    btnSwitchB.setAttribute('aria-pressed', 'false');
    caixaStatus.textContent = 'Acionador A ativado: Iluminacao inteligente e comando de voz da sala ativados.';
    anunciarLeitorDeTela(caixaStatus.textContent);
  });

  btnSwitchB.addEventListener('click', function () {
    btnSwitchA.setAttribute('aria-pressed', 'false');
    btnSwitchB.setAttribute('aria-pressed', 'true');
    caixaStatus.textContent = 'Acionador B ativado: Controle adaptado do videogame e Audiodescricao (AD) ligados.';
    anunciarLeitorDeTela(caixaStatus.textContent);
  });
});
