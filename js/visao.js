document.addEventListener('DOMContentLoaded', function () {
  var btnComAlt = document.getElementById('botao-com-alt');
  var btnSemAlt = document.getElementById('botao-sem-alt');
  var saidaLeitor = document.getElementById('texto-simulador-alt');

  btnComAlt.addEventListener('click', function () {
    btnComAlt.setAttribute('aria-pressed', 'true');
    btnSemAlt.setAttribute('aria-pressed', 'false');
    saidaLeitor.textContent = 'Imagem: "Embalagem de leite integral 1 litro sem lactose, com etiqueta Braille e validade para 15 de dezembro."';
    anunciarLeitorDeTela(saidaLeitor.textContent);
  });

  btnSemAlt.addEventListener('click', function () {
    btnComAlt.setAttribute('aria-pressed', 'false');
    btnSemAlt.setAttribute('aria-pressed', 'true');
    saidaLeitor.textContent = 'Imagem: "IMG_9482_foto.jpg" (Sem atributo alt descritivo, a pessoa cega nao sabe qual e o produto).';
    anunciarLeitorDeTela(saidaLeitor.textContent);
  });
});
