// variáveis da balinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// variaveis de velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;



function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha ();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  verificaColisao(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaOponente();
  calculaChanceDeErrar();
  verificaColisao(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha  + raio > height || yBolinha - raio <0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y, comprimentoRaquete, alturaRaquete)
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaquete(){
if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
   velocidadeXBolinha *= -1
 }
}

function  verificaColisao(x,y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete,xBolinha, yBolinha, raio);
  if (colidiu){
   velocidadeXBolinha *= -1 
  }
}



function movimentaOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 -30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluirPlacar(){
  stroke (255);
  textSize(18);
  textAlign(CENTER);
  fill (color (255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255);
  text(meusPontos, 170, 26);
  fill (color (255, 140, 0));
  rect (450, 10, 40, 20);
  fill (255);
  text (pontosOponente, 470,26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
  }
  if (xBolinha < 10){
    pontosOponente += 1;
  }
}