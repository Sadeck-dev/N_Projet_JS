// DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const winPara = document.getElementById("winPara");
const button = document.getElementById("button");

// Logique du jeu
const TAILLE = 300;
const CASE = TAILLE / 3;
let coups = 0;
let GRILLE = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let player = 1;
let finPartie = false;

function restartGame() {
   GRILLE = [
       [0, 0, 0],
       [0, 0, 0],
       [0, 0, 0]
      ];
       dessinerJeu();
   coups = 0;
   finPartie = false;
   winPara.textContent = '';
}

//fonction pour dessiner le jeu
function dessinerGrille() {
    ctx.lineWidth = 2;
    
    // ligne vertical
    for(let i = 0; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CASE, 0);
        ctx.lineTo(i * CASE, TAILLE);
        ctx.stroke();
    }
    
    // ligne horizontal
    for(let i = 0; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CASE);
        ctx.lineTo(TAILLE, i * CASE);
        ctx.stroke();
    }
}

// dessiner le X et O
function dessinerX(col, ligne) {
    const padding = 20;
    
    ctx.beginPath();
    ctx.moveTo(col * CASE + padding, ligne * CASE + padding);
    ctx.lineTo((col + 1) * CASE - padding, (ligne + 1) * CASE - padding);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(col * CASE + padding, (ligne + 1) * CASE - padding);
    ctx.lineTo((col + 1) * CASE - padding, ligne * CASE + padding);
    ctx.stroke();
}

function dessinerO(col, ligne) {
    const centreX = col * CASE + CASE / 2;
    const centreY = ligne * CASE + CASE / 2;
    const rayon = CASE / 2 - 10;
    
    ctx.beginPath();
    ctx.arc(centreX, centreY, rayon, 0, Math.PI * 2);
    ctx.stroke();
}

function dessinerJeu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerGrille();
    
    for(let i = 0; i <= 2; i++) {
        for(let j = 0; j <= 2; j++) {
            if (GRILLE[i][j] === 1) {
                dessinerX(j, i);
                coups++;
            } else if (GRILLE[i][j] === 2) {
                dessinerO(j, i);
                coups++;
            }
        }
    }
 }

button.addEventListener('click', () => {
    restartGame();
});

// Définition des fonctions
function winnerTracker() {
    // lignes et colonnes
    for(let i = 0; i <= 2; i++) {
        if (
        GRILLE[i][0] && 
        GRILLE[i][0] === GRILLE[i][1] &&
        GRILLE[i][0] === GRILLE[i][2]) {
            return true;
        }
        
        if (
        GRILLE[0][i] && 
        GRILLE[0][i] === GRILLE[1][i] &&
        GRILLE[1][i] === GRILLE[2][i]) {
            return true;
        }
    }
    
    // oblique 
    
    if (
        GRILLE[0][0] && 
        GRILLE[0][0] === GRILLE[1][1] &&
        GRILLE[1][1] === GRILLE[2][2]) {
            return true;
        }
        
        if (
        GRILLE[0][2] && 
        GRILLE[0][2] === GRILLE[1][1] &&
        GRILLE[1][1] === GRILLE[2][0]) {
            return true;
        }
    
    return false;
}

canvas.addEventListener('click', (e) => {
   if (finPartie) return;
   
   const rect = canvas.getBoundingClientRect();
   const x = e.clientX - rect.left;
   const y = e.clientY - rect.top;
  
  // convertion en colonne
  const col = Math.floor(x / CASE);
  const ligne = Math.floor(y / CASE);
  
  if (GRILLE[ligne][col] !== 0) return;
  
  GRILLE[ligne][col] = player;
  dessinerJeu();
  
  if (winnerTracker()) {
      winPara.style.color = 'green';
      winPara.textContent = `Le joueur ${player} a gagné !`;
      finPartie = true;
  } else {
     player = player === 1 ? 2: 1; 
  }
  
});

if (coups === 9 && !finPartie) {
    winPara.style.color = 'red';
    winPara.textContent = `La partie est terminée ! Aucun gagnant !`;
}

// démarrer le jeu
dessinerJeu();
