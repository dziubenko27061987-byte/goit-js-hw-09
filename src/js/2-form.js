const formState = {
  email: "",
  message: "",
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  if (!savedData) {
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);
    
    formState.email = parsedData.email || "";
    formState.message = parsedData.message || "";

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  } catch (error) {
    console.error("Error parsing data from localStorage", error);
  }
}

populateForm();

form.addEventListener("input", (event) => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  formState[fieldName] = fieldValue.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formState.email === "" || formState.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log(formState);

  localStorage.removeItem(STORAGE_KEY);
  formState.email = "";
  formState.message = "";
  form.reset();
});