//validate form filds

function valida(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = mostraMensagemDeErro(tipoDeInput, input);
  }
}

const tiposDeErro = ["valueMissing", "typeMismatch", "patternMismatch", "customError"];

const mensagensDeErro = {
  nome: {
    valueMissing: "O campo nome não pode estar vazio",
  },
  email: {
    valueMissing: "O campo de email não pode estar vazio",
    typeMismatch: "O email digitado não é valido",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio",
    customError: "O CPF digitado não é válido.",
  },
};

const validadores = {
  cpf: (input) => validaCPF(input),
};

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = "";
  tiposDeErro.forEach((erro) => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });
  return mensagem;
}

// cpf validation

function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, "");
  let mensagem = "";

  if (!checaCPFRepetido(cpfFormatado)) {
    mensagem = "O CPF digitado não é válido.";
  }

  input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
  const valoresRepetidos = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "66666666666", "77777777777", "88888888888", "99999999999"];
  let cpfValido = true;

  valoresRepetidos.forEach((valor) => {
    if (valor == cpf) {
      cpfValido = false;
    }
  });

  return cpfValido;
}

//cpf mask

const masks = {
  cpf(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  },
};

document.querySelectorAll("input").forEach(($input) => {
  const field = $input.dataset.tipo;

  $input.addEventListener(
    "input",
    (e) => {
      e.target.value = masks[field](e.target.value);
    },
    false
  );
});
