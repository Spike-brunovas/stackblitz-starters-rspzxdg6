const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const operacao = document.getElementById("operacao");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

calcular.addEventListener("click", function() {

  let n1 = Number(numero1.value);
  let n2 = Number(numero2.value);
  let op = operacao.value;
  let resposta;

  if (numero1.value === "" || numero2.value === "") {

    resultado.textContent = "Digite os dois números.";

    return;
  }

  if (op === "+") {
    resposta = n1 + n2;
  }

  else if (op === "-") {
    resposta = n1 - n2;
  }

  else if (op === "*") {
    resposta = n1 * n2;
  }

  else if (op === "/") {

    if (n2 === 0) {
      resultado.textContent = "Não é possível dividir por zero.";
      return;
    }

    resposta = n1 / n2;
  }

  resultado.textContent = "Resultado: " + resposta;
});