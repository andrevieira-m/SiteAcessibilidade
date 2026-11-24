document.addEventListener('DOMContentLoaded', function () {
  var formulario = document.getElementById('form-contato');
  var campos = formulario.querySelectorAll('input, textarea');

  function atualizarEstadoAcessivel(campo, anunciarErro) {
    var idErro = campo.getAttribute('data-erro');
    var invalido = campo.matches(':user-invalid') || campo.classList.contains('campo-invalido');

    if (invalido) {
      campo.setAttribute('aria-invalid', 'true');
      if (idErro) {
        campo.setAttribute('aria-describedby', idErro);
        if (anunciarErro) {
          anunciarLeitorDeTela(document.getElementById(idErro).innerText);
        }
      }
    } else {
      campo.setAttribute('aria-invalid', 'false');
      campo.removeAttribute('aria-describedby');
    }
  }

  for (var i = 0; i < campos.length; i++) {
    campos[i].setAttribute('aria-invalid', 'false');

    campos[i].addEventListener('blur', function () {
      atualizarEstadoAcessivel(this, true);
    });

    campos[i].addEventListener('input', function () {
      this.classList.remove('campo-invalido');
      atualizarEstadoAcessivel(this, false);
    });
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      var primeiroInvalido = formulario.querySelector(':invalid');
      primeiroInvalido.classList.add('campo-invalido');
      atualizarEstadoAcessivel(primeiroInvalido, true);
      primeiroInvalido.focus();
      return;
    }

    var caixaFeedback = document.getElementById('retorno-envio');
    var nomeUsuario = document.getElementById('nome').value;

    caixaFeedback.textContent = 'Obrigado, ' + nomeUsuario + '! Seu relato sobre acessibilidade foi enviado com sucesso.';
    caixaFeedback.classList.add('visivel');
    caixaFeedback.focus();

    anunciarLeitorDeTela('Formulario enviado com sucesso!');
    formulario.reset();
  });
});
