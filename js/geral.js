var tamanhoFonteAtual = 100;

var caixaAnuncio = document.createElement('div');
caixaAnuncio.setAttribute('aria-live', 'polite');
caixaAnuncio.className = 'oculto-visualmente';

function anunciarLeitorDeTela(texto) {
  caixaAnuncio.textContent = '';
  setTimeout(function () {
    caixaAnuncio.textContent = texto;
  }, 250);
}

function alternarAltoContraste() {
  var html = document.documentElement;
  var botaoContraste = document.getElementById('botao-contraste');
  var ativo = html.getAttribute('data-tema') === 'alto-contraste';

  if (ativo) {
    html.removeAttribute('data-tema');
    localStorage.setItem('tema_acessibilidade', 'padrao');
    botaoContraste.setAttribute('aria-pressed', 'false');
    anunciarLeitorDeTela('Modo alto contraste desativado.');
  } else {
    html.setAttribute('data-tema', 'alto-contraste');
    localStorage.setItem('tema_acessibilidade', 'alto-contraste');
    botaoContraste.setAttribute('aria-pressed', 'true');
    anunciarLeitorDeTela('Modo alto contraste ativado.');
  }
}

function atualizarFonte(novoTamanho) {
  if (novoTamanho < 90) novoTamanho = 90;
  if (novoTamanho > 130) novoTamanho = 130;

  tamanhoFonteAtual = novoTamanho;
  document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
  localStorage.setItem('tamanho_fonte', tamanhoFonteAtual);
  anunciarLeitorDeTela('Tamanho da fonte: ' + tamanhoFonteAtual + ' por cento.');
}

function configurarLeitorDeVoz() {
  var btnOuvir = document.getElementById('botao-ouvir-pagina');
  var btnParar = document.getElementById('botao-parar-leitura');
  var statusTexto = document.getElementById('status-leitura');
  var areaArtigo = document.getElementById('artigo-leitura');

  btnOuvir.addEventListener('click', function () {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btnOuvir.setAttribute('aria-pressed', 'false');
      btnParar.hidden = true;
      statusTexto.textContent = 'Leitura pausada.';
      return;
    }

    var fala = new SpeechSynthesisUtterance(areaArtigo.innerText);
    fala.lang = 'pt-BR';

    fala.onstart = function () {
      btnOuvir.setAttribute('aria-pressed', 'true');
      btnParar.hidden = false;
      statusTexto.textContent = 'Lendo artigo...';
    };

    fala.onend = function () {
      btnOuvir.setAttribute('aria-pressed', 'false');
      btnParar.hidden = true;
      statusTexto.textContent = 'Leitura concluida.';
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  });

  btnParar.addEventListener('click', function () {
    window.speechSynthesis.cancel();
    btnOuvir.setAttribute('aria-pressed', 'false');
    btnParar.hidden = true;
    statusTexto.textContent = 'Leitura interrompida.';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(caixaAnuncio);

  var temaSalvo = localStorage.getItem('tema_acessibilidade');
  if (temaSalvo === 'alto-contraste') {
    document.documentElement.setAttribute('data-tema', 'alto-contraste');
    document.getElementById('botao-contraste').setAttribute('aria-pressed', 'true');
  }

  var fonteSalva = parseInt(localStorage.getItem('tamanho_fonte'), 10);
  if (fonteSalva) {
    tamanhoFonteAtual = fonteSalva;
    document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
  }

  document.getElementById('botao-contraste').addEventListener('click', alternarAltoContraste);
  document.getElementById('botao-aumentar-fonte').addEventListener('click', function () { atualizarFonte(tamanhoFonteAtual + 10); });
  document.getElementById('botao-diminuir-fonte').addEventListener('click', function () { atualizarFonte(tamanhoFonteAtual - 10); });
  document.getElementById('botao-resetar-fonte').addEventListener('click', function () { atualizarFonte(100); });

  document.addEventListener('keydown', function (evento) {
    if (evento.altKey && evento.key === '1') {
      evento.preventDefault();
      document.getElementById('titulo-principal').focus();
    } else if (evento.altKey && evento.key === '2') {
      evento.preventDefault();
      document.getElementById('link-menu-inicio').focus();
    } else if (evento.altKey && evento.key === '3') {
      evento.preventDefault();
      document.getElementById('rodape-titulo').focus();
    } else if (evento.altKey && evento.key === '4') {
      evento.preventDefault();
      alternarAltoContraste();
    }
  });

  configurarLeitorDeVoz();
});
