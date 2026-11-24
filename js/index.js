document.addEventListener('DOMContentLoaded', function () {
  var playerAudio = document.querySelector('.caixa-audio audio');
  var trechosTranscricao = document.querySelectorAll('.trecho-transcricao');

  playerAudio.addEventListener('timeupdate', function () {
    var tempoAtual = playerAudio.currentTime;

    for (var i = 0; i < trechosTranscricao.length; i++) {
      var trecho = trechosTranscricao[i];
      var inicio = parseFloat(trecho.getAttribute('data-inicio'));
      var fim = parseFloat(trecho.getAttribute('data-fim'));

      if (!playerAudio.paused && tempoAtual >= inicio && tempoAtual <= fim) {
        trecho.classList.add('ativo');
      } else {
        trecho.classList.remove('ativo');
      }
    }
  });

  var btnLerDepoimento = document.getElementById('botao-ler-depoimento');
  var textoDepoimento = document.getElementById('texto-depoimento');

  btnLerDepoimento.addEventListener('click', function () {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btnLerDepoimento.setAttribute('aria-pressed', 'false');
      return;
    }

    var fala = new SpeechSynthesisUtterance(textoDepoimento.innerText);
    fala.lang = 'pt-BR';
    fala.onstart = function () { btnLerDepoimento.setAttribute('aria-pressed', 'true'); };
    fala.onend = function () { btnLerDepoimento.setAttribute('aria-pressed', 'false'); };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  });
});
