//Função para alterar a exibição do formulario de desconto
function toggleDiscount() {
  const discountBody = document.getElementById("apply-discount-body");
  const icon = document.getElementById("toogle-icon");

  //Alternar visibilidade do formulario de desconto
  if (
    discountBody.style.display === "none" ||
    discountBody.style.display === ""
  ) {
    discountBody.style.display = "block";
    icon.classList.add("bxs-chevron-up");
    icon.classList.remove("bxs-chevron-down");
  } else {
    discountBody.style.display = "none";
    icon.classList.add("bxs-chevron-down");
    icon.classList.remove("bxs-chevron-up");
  }
}

//Todos os descontos
const discountCupons = {
  DESCONTO10: 0.1, //10% DE DESCONTO
  DESCONTO20: 0.2, //20% DE DESCONTO
  DESCONTO50: 0.5, //50% DE DESCONTO
};

//Função para aplicar desconto
function applyDiscount() {
  const discountCode = document
    .getElementById("discount-code")
    .value.trim()
    .toUpperCase();

  const discountMenssageElement = document.getElementById("discount-message");
  const totalPriceElement = document.getElementById("total-price");

  //Verificar se o cupom é valido

  if (discountCupons[discountCode]) {
    const discount = discountCupons[discountCode];
    const originalPrice = 1200;
    const discountPrice = originalPrice * (1 - discount);

    //Atualizar o preço

    totalPriceElement.innerText = `Preço total: R$ ${discountPrice.toFixed(2)}`;

    //Armazenar cumpom no local Storage

    localStorage.setItem("discount", discountCode);

    //Exibir mensagem de desconto
    discountMenssageElement.style.color = "green";
    discountMenssageElement.innerText = `Desconto de ${discountCode} aplicado`;

    //Limpar o campo input
    document.getElementById("discount-code").value = "";
  } else {
    //Cupom não valido
    discountMenssageElement.style.color = "red";
    discountMenssageElement.innerText = "Cupom Invalido";
  }
}

function checkStoredDiscount() {
  const storedDiscount = localStorage.getItem("discount");
  const discountMessageElement = document.getElementById("discount-message");

  //Verificar se há cupom no localStorage
  if (storedDiscount) {
    localStorage.removeItem("discount");
  }

  discountMessageElement.innerText = "";
}

window.onload = checkStoredDiscount;
