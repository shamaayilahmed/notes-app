const addBtn = document.getElementById('add');

const notes=JSON.parse(localStorage.getItem('notes'));

if(notes){
  notes.forEach(note=>{
    addNewNote(note);
  })
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text='') {
  const note = document.createElement('div');
  note.classList.add('note');
  const toolBar=document.querySelector('.tools');
  //const date=new Date().toLocaleString();
  note.innerHTML = `
    
    <div class="tools">
      <p></p>
      <button class="edit"><i class="fas fa-save"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden': ''}"></textarea>
  
  `;


  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');
  
  textArea.value=text;
  main.innerHTML=marked(text);
  //DateTime
  const datePara = note.querySelector('p');
  editBtn.addEventListener('click', () => {
    if (main.classList.contains('hidden')) {
      datePara.innerHTML = new Date().toLocaleString();
      localStorage.setItem('dates',datePara.innerHTML);
      localStorage.getItem('dates');
      editBtn.querySelector('i').className = 'fas fa-edit';
    } else {
      const datePara = '';
      editBtn.querySelector('i').className = 'fas fa-save';
    }
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');

  });

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });
  textArea.addEventListener('input', (e) => {
    const { value } = e.target;  //destructuring 
    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS(){
  const notesTxt=document.querySelectorAll('textarea');
  
  
// console.log(notesTxt);
  const notes=[];

  notesTxt.forEach(note=>{
    notes.push(note.value);
  });

  localStorage.setItem('notes',JSON.stringify(notes));
  // localStorage.setItem('dates',JSON.stringify(dates));
}



