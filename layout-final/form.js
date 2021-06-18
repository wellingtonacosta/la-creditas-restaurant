//add event to submit form data

function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const dataJson = {
    name: formData.get("name"),
    email: formData.get("email"),
    cpf: formData.get("cpf").replace(/\D/g, ""),
  };
  console.log(dataJson);
  fetch("https://60cc9be171b73400171f817c.mockapi.io/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataJson),
  }).then((response) => {});
}
