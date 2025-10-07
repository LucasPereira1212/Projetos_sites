document.addEventListener("DOMContentLoaded", function () {
  //Declaração de Variaveis

  const formulario = document.getElementById("calc-form");
  let valoresObrigatorios = document.querySelectorAll(".obrigatorio");
  const resultado = document.getElementById("Resultado");
  let nome = document.getElementById("nome");

  //Função para quando ouvir o evento de envio, estar nos padrões

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validarCampos()) {
      resultado.innerHTML = `<p>Olá ${
        nome.value
      },</p> <p>bem vindo a calculador de imc</p>
      <p>e seu valor IMC é ${calcularImc().toFixed(2)}</p>
      <p>sua categoria é ${categoriaImc()}</p>`;

      let dados = new FormData(formulario);
      dados.set("categoria", categoriaImc());
      for (let [chave, valor] of dados.entries())
        console.log(chave + ": " + valor);
    }
  });

  //função para validar o campo obrigatorio de nome

  function validarCampos() {
    let campoObrigatorio = true;
    let campo = valoresObrigatorios[0];
    if (campo.value === "" || campo.value === null) {
      exibirErro(campo, "Por favor, insira o seu Nome");
      campoObrigatorio = false;
    } else {
      desativarMensagemErro(campo);
    }

    return campoObrigatorio;
  }

  //Função para exibir o erro de nome não inserido

  function exibirErro(elemento, mensagem) {
    const mensagemErro =
      elemento.parentElement.querySelector(".error-Mensagen");
    mensagemErro.textContent = mensagem;
    mensagemErro.style.display = "inline-block";
  }

  //função para desativar a mensagem de erro

  function desativarMensagemErro(elemento) {
    let mensagemErro = elemento.parentElement.querySelector(".error-Mensagen");
    mensagemErro.style.display = "none";
  }

  //função para calcular o IMC

  function calcularImc() {
    let campoAltura = parseFloat(valoresObrigatorios[1].value);
    let campoPeso = parseFloat(valoresObrigatorios[2].value);
    let valorImc = campoPeso / (campoAltura * campoAltura);
    return valorImc;
  }

  //Função para exibir a categoria do IMC

  function categoriaImc() {
    let categoria = "";
    if (calcularImc() < 18.5) {
      categoria = "Baixo do peso";
      resultado.style.backgroundColor = "#FFFF00";
    } else if (calcularImc() >= 18.6 && calcularImc() <= 24.9) {
      categoria = "Peso normal";
      resultado.style.backgroundColor = "#58d300ff";
    } else if (calcularImc() >= 25 && calcularImc() <= 29.9) {
      categoria = "Sobrepeso";
      resultado.style.backgroundColor = "#ff00c8ff";
    } else if (calcularImc() >= 30 && calcularImc() <= 34.9) {
      categoria = "Obesidade grau 1";
      resultado.style.backgroundColor = "#ff4800ff";
    } else if (calcularImc() >= 35 && calcularImc() <= 39.9) {
      categoria = "Obesidade graus 2";
      resultado.style.backgroundColor = "#ff1900ff";
    } else if (calcularImc() >= 40) {
      categoria = "Obesidade grau 3";
      resultado.style.backgroundColor = "#ff0000ff";
    }

    return categoria;
  }
});
