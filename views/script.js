// script.js

function showForm(type) {
  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  const formTitle = document.createElement('h2');
  formTitle.classList.add('form-title');
  formTitle.textContent = `SToC Exchange - ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  formContainer.appendChild(formTitle);

  const form = document.createElement('form');
  form.classList.add('form');

  const nameGroup = createFormGroup('Name:', 'name', 'text', 'Your Name');
  form.appendChild(nameGroup);

  const phoneGroup = createFormGroup('Phone Number:', 'phone', 'text', 'Your Phone Number');
  form.appendChild(phoneGroup);

  const gradeGroup = createFormGroup('Grade:', 'grade', 'select');
  const gradeSelect = gradeGroup.querySelector('select');
  gradeSelect.innerHTML = `
    <option value="">Select Grade</option>
    <option value="IGCSE - 8th">IGCSE - 8th</option>
    <option value="IGCSE - 9th">IGCSE - 9th</option>
    <option value="IGCSE - 10th">IGCSE - 10th</option>
    <option value="Pre-IB">Pre-IB</option>
    <option value="IB-1">IB-1</option>
    <option value="IB-2">IB-2</option>
    <option value="other">Other</option>
  `;
  form.appendChild(gradeGroup);

  const textbooksGroup = createFormGroup('Text Books:', 'textbooks', 'select');
  const textbooksSelect = textbooksGroup.querySelector('select');
  textbooksSelect.innerHTML = `
    <option value="">Select Text Book</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Maths">Maths</option>
  `;
  form.appendChild(textbooksGroup);

  const papersGroup = createFormGroup('Past years compiled papers (B/W Spiral Binding):', 'compiled_papers', 'select');
  const papersSelect = papersGroup.querySelector('select');
  papersSelect.innerHTML = `
    <option value="">Select Paper</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Maths">Maths</option>
  `;
  form.appendChild(papersGroup);

  const formButtons = document.createElement('div');
  formButtons.classList.add('form-buttons');
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.classList.add('submit-button');
  submitButton.type = 'submit';
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.classList.add('back-button');
  backButton.type = 'button';
  backButton.addEventListener('click', goBack);
  formButtons.appendChild(submitButton);
  formButtons.appendChild(backButton);

  form.appendChild(formButtons);
  formContainer.appendChild(form);

  document.body.appendChild(formContainer);
}

function createFormGroup(labelText, inputName, inputType, placeholder = '') {
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  const label = document.createElement('label');
  label.textContent = labelText;

  const input = document.createElement('input');
  input.name = inputName;
  input.type = inputType;
  input.placeholder = placeholder;

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  return formGroup;
}

function goBack() {
  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    document.body.removeChild(formContainer);
  }
}
