let campoMinato = document.getElementById("campoMinato");
let campo = [];
let dimensione;
let numeroMine;

// Inizializza il campo minato
function inizializzaCampo() {
  // Crea una matrice vuota per rappresentare il campo minato
  campo = new Array(dimensione);
  for (let i = 0; i < dimensione; i++) {
    campo[i] = new Array(dimensione).fill(0);
  }
  
  // Posiziona le mine casualmente nel campo minato
  let mineInserite = 0;
  while (mineInserite < numeroMine) {
    let riga = Math.floor(Math.random() * dimensione);
    let colonna = Math.floor(Math.random() * dimensione);
    
    // Se la cella non contiene già una mina, inserisci una mina
    if (campo[riga][colonna] !== -1) {
      campo[riga][colonna] = -1;
      mineInserite++;
    }
  }
  
  // Calcola il numero di mine adiacenti per ogni cella
  for (let row = 0; row < dimensione; row++) {
    for (let col = 0; col < dimensione; col++) {
      if (campo[row][col] !== -1) {
        let count = 0;
        
        // Conta il numero di mine adiacenti
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < dimensione && j >= 0 && j < dimensione && campo[i][j] === -1) {
              count++;
            }
          }
        }
        
        campo[row][col] = count;
      }
    }
  }
}

// Crea la griglia del campo minato
function creaCampoMinato(size, mines) {
  dimensione = size;
  numeroMine = mines;

  // Rimuovi il campo minato precedente
  while (campoMinato.firstChild) {
    campoMinato.removeChild(campoMinato.firstChild);
  }
  
  inizializzaCampo();

  for (let row = 0; row < dimensione; row++) {
    for (let col = 0; col < dimensione; col++) {
      let cella = document.createElement("div");
      cella.className = "cell";
      cella.setAttribute("data-row", row);
      cella.setAttribute("data-col", col);
      cella.addEventListener("click", scopriCella);
      campoMinato.appendChild(cella);
    }
  }
}

// Gestisce il clic su una cella
function scopriCella(event) {
  var row = parseInt(event.target.getAttribute("data-row"));
  var col = parseInt(event.target.getAttribute("data-col"));
  var valore = campo[row][col];
  
  // Se la cella contiene una mina, mostra tutte le mine e termina il gioco
  if (valore === -1) {
    for (var row = 0; row < dimensione; row++) {
      for (var col = 0; col < dimensione; col++) {
        var cella = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (campo[row][col] === -1) {
         cella.textContent = "X";
          cella.style.backgroundColor = "red";
        }
        
        cella.removeEventListener("click", scopriCella);
      }
    }
    
    alert("Hai perso!");
  } else {
    // Altrimenti, mostra il valore della cella
    event.target.textContent = valore;
    event.target.style.backgroundColor = "lightgray";
  }
}