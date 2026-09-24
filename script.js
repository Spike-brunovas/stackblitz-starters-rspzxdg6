const tipoCalculo = document.getElementById("tipoCalculo");
const campos = document.getElementById("campos");
const formula = document.getElementById("formula");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");
const canvas = document.getElementById("grafico");

let grafico;

tipoCalculo.addEventListener("change", mostrarCampos);

function mostrarCampos() {
  const tipo = tipoCalculo.value;

  if (tipo === "soma" || tipo === "subtracao" || tipo === "multiplicacao" || tipo === "divisao") {
    const formulas = {
      soma: "Fórmula: a + b",
      subtracao: "Fórmula: a - b",
      multiplicacao: "Fórmula: a × b",
      divisao: "Fórmula: a ÷ b"
    };

    formula.textContent = formulas[tipo];

    campos.innerHTML = `
      <div class="campo">
        <label>Primeiro número</label>
        <input type="number" id="numero1" placeholder="Ex: 10">
      </div>
      <div class="campo">
        <label>Segundo número</label>
        <input type="number" id="numero2" placeholder="Ex: 5">
      </div>
    `;
  }

  else if (tipo === "exponencial") {
    formula.textContent = "Fórmula: f(x) = aˣ";

    campos.innerHTML = `
      <div class="campo">
        <label>Base (a)</label>
        <input type="number" id="base" value="2" step="0.1" placeholder="Ex: 2">
      </div>
      <div class="campo">
        <label>Expoente (x)</label>
        <input type="number" id="expoente" value="3" step="0.1" placeholder="Ex: 3">
      </div>
    `;
  }

  else if (tipo === "logaritmo") {
    formula.textContent = "Fórmula: f(x) = logᵦ(x)";

    campos.innerHTML = `
      <div class="campo">
        <label>Base (b)</label>
        <input type="number" id="base" value="10" min="0.1" step="0.1" placeholder="Ex: 10">
      </div>
      <div class="campo">
        <label>Número (x)</label>
        <input type="number" id="numero" value="100" min="0.1" step="0.1" placeholder="Ex: 100">
      </div>
    `;
  }

  else if (tipo === "quadratica") {
    formula.textContent = "Fórmula: f(x) = ax² + bx + c";

    campos.innerHTML = `
      <div class="campo">
        <label>Coeficiente a</label>
        <input type="number" id="coefA" value="1" step="0.1" placeholder="Ex: 1">
      </div>
      <div class="campo">
        <label>Coeficiente b</label>
        <input type="number" id="coefB" value="0" step="0.1" placeholder="Ex: 0">
      </div>
      <div class="campo">
        <label>Coeficiente c</label>
        <input type="number" id="coefC" value="0" step="0.1" placeholder="Ex: 0">
      </div>
      <div class="campo">
        <label>Valor de x</label>
        <input type="number" id="valorX" value="2" step="0.1" placeholder="Ex: 2">
      </div>
    `;
  }

  else if (tipo === "raiz") {
    formula.textContent = "Fórmula: f(x) = √x";

    campos.innerHTML = `
      <div class="campo">
        <label>Número (x)</label>
        <input type="number" id="numero" value="25" min="0" step="0.1" placeholder="Ex: 25">
      </div>
    `;
  }
}

calcular.addEventListener("click", function () {
  const tipo = tipoCalculo.value;
  let resposta;

  if (tipo === "soma" || tipo === "subtracao" || tipo === "multiplicacao" || tipo === "divisao") {
    const a = Number(document.getElementById("numero1").value);
    const b = Number(document.getElementById("numero2").value);

    if (document.getElementById("numero1").value === "" ||
        document.getElementById("numero2").value === "") {
      resultado.textContent = "Digite os dois números.";
      return;
    }

    if (tipo === "soma") resposta = a + b;
    else if (tipo === "subtracao") resposta = a - b;
    else if (tipo === "multiplicacao") resposta = a * b;
    else {
      if (b === 0) {
        resultado.textContent = "Não é possível dividir por zero.";
        return;
      }
      resposta = a / b;
    }
  }

  else if (tipo === "exponencial") {
    const a = Number(document.getElementById("base").value);
    const x = Number(document.getElementById("expoente").value);

    if (a <= 0) {
      resultado.textContent = "A base deve ser maior que zero.";
      return;
    }

    resposta = Math.pow(a, x);
  }

  else if (tipo === "logaritmo") {
    const b = Number(document.getElementById("base").value);
    const x = Number(document.getElementById("numero").value);

    if (b <= 0 || b === 1) {
      resultado.textContent = "A base deve ser positiva e diferente de 1.";
      return;
    }

    if (x <= 0) {
      resultado.textContent = "O número do logaritmo deve ser maior que zero.";
      return;
    }

    resposta = Math.log(x) / Math.log(b);
  }

  else if (tipo === "quadratica") {
    const a = Number(document.getElementById("coefA").value);
    const b = Number(document.getElementById("coefB").value);
    const c = Number(document.getElementById("coefC").value);
    const x = Number(document.getElementById("valorX").value);

    resposta = a * Math.pow(x, 2) + b * x + c;
  }

  else if (tipo === "raiz") {
    const x = Number(document.getElementById("numero").value);

    if (x < 0) {
      resultado.textContent = "Não existe raiz quadrada real de número negativo.";
      return;
    }

    resposta = Math.sqrt(x);
  }

  resultado.textContent = "Resultado: " + resposta;
  atualizarGrafico();
});

function atualizarGrafico() {
  const tipo = tipoCalculo.value;
  const labels = [];
  const valores = [];

  for (let x = -10; x <= 10; x += 0.2) {
    x = Number(x.toFixed(2));
    labels.push(x);

    let y;

    if (tipo === "exponencial") {
      const a = Number(document.getElementById("base").value);
      if (a > 0 && a !== 1) y = Math.pow(a, x);
    }

    else if (tipo === "logaritmo") {
      if (x > 0) {
        const b = Number(document.getElementById("base").value);
        if (b > 0 && b !== 1) y = Math.log(x) / Math.log(b);
      }
    }

    else if (tipo === "quadratica") {
      const a = Number(document.getElementById("coefA").value);
      const b = Number(document.getElementById("coefB").value);
      const c = Number(document.getElementById("coefC").value);
      y = a * Math.pow(x, 2) + b * x + c;
    }

    else if (tipo === "raiz") {
      if (x >= 0) y = Math.sqrt(x);
    }

    if (y !== undefined && (!Number.isFinite(y) || Math.abs(y) > 100)) {
      y = null;
    }

    valores.push(y);
  }

  if (grafico) grafico.destroy();

  grafico = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "f(x)",
        data: valores,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.08)",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2,
        fill: true,
        spanGaps: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: "x" }
        },
        y: {
          title: { display: true, text: "f(x)" }
        }
      }
    }
  });
}

mostrarCampos();
atualizarGrafico();