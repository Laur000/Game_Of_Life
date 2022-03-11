var squares = 35;
var offsetY = 30;

//functia pentru a creea un array bidimensional
function make2DArray() {

    var arr = new Array(squares);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(squares);
    }

    return arr;
}




var matr;
var grid;
var next;           //folosita pentru a creea un nou grid
var cheiePress;
var rndm;           //folosita pentru valori random
var butonPress;
var startButton;
var verifica;

function setup() {
    createCanvas(900, 900 + offsetY);
    matr = floor(width / squares);
    grid = make2DArray();

    for (let i = 0; i < squares; i++) {
        for (let j = 0; j < squares; j++) {
            grid[i][j] = 0;
        }
    }

    //setez variabilele pe o valoare default, in acest caz false
    cheiePress = false;
    rndm = false;
    butonPress = false;
    verifica = false;

    //cREEZ BUTONUL DE START
    startButton = createButton("START");
    startButton.style('font-size', '30px', 'Italic');
    startButton.style('background-color', 'lightgreen');
    startButton.position(width / 2 - 60, height - height / 3.2);
    startButton.size(150, 75);
    startButton.mousePressed(play);
}
//----------------------------------------
function draw() {

    if (!butonPress) {
        pageInit();
    } else if (rndm && !cheiePress) {
        fillGrid();
        write2("Poti ADAUGA sau STERGE celule, sau poti GOLII tabla de pe 'c'. 'ENTER' pentru a incepe.");
    } else if (cheiePress == false) {
        fillGrid();
        write("Poti adauga celule din mouse. Apasa 'r' pentru celule random si 'c' pentru a goli tabla.");
        verifica = true;
    } else {
        fillGrid();
        write1("Jocul a inceput. Apasa 'ENTER' pentru a pune pauza sau 'c' pentru a golii tabla si a incepe din nou.");

        next = make2DArray();

        // aici urmeaza jocul in sine, si implementarea regulilor
        for (let i = 0; i < squares; i++) {
            for (let j = 0; j < squares; j++) {

                var current = grid[i][j];
                var neighbours = countNeighbors(i, j);

                if (current == 0 && neighbours == 3) {
                    next[i][j] = 1;
                } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = current;
                }
            }
        }

        grid = next;
    }
}
//------------------------------------

//in momentul in care o sa apasam pe START, fereastra se va schimba si vom creea matricea cu jocul.
function mousePressed() {

    for (let i = 0; i < squares; i++) {
        for (let j = 0; j < squares; j++) {
            if (verifica && mouseX > i * matr && mouseX < i * matr + matr && mouseY > j * matr + offsetY && mouseY < j * matr + matr + offsetY) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
                break;
            }
        }
    }
}
//------------------------------------
// vreificam ce butoane apasam, in cazul in care apasam un buton care trebuie sa indeplineasca
//o functionalitate anume, acea functionalitae e implementata aici, iar dupa apasare, aceasta functionalitate
//se va executa.
function keyTyped() {

    if (key == 'r') {
        if (!cheiePress && butonPress) {
            for (let i = 0; i < squares; i++) {
                for (let j = 0; j < squares; j++) {
                    grid[i][j] = floor(random(2));
                }
            }

            cheiePress = false;
            rndm = true;
        }
    }

    if (key == 'c' && butonPress) {
        for (let i = 0; i < squares; i++) {
            for (let j = 0; j < squares; j++) {
                grid[i][j] = 0;
            }
        }

        rndm = false;
        cheiePress = false;
    }

    // keyCode = 13, reprezinta de fapt tasta ENTER, schimb valorile pentru 'cheiePress' in cazul in care pornesc sau
    //pun jocul pe pauza, cu 'false' si 'true'
    if (keyCode == 13 && butonPress) {
        if (!cheiePress) {
            cheiePress = true;
        } else if (cheiePress) {
            cheiePress = false;
        }
    }
}

//-----------------------------------------------------------------------------------
//functia ne returneaza numarul de vecini
//a trebuit sa am grija si la cazul in care o celula se afla la margini.
function countNeighbors(i, j) {

    var vieti = 0;

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < squares && j + y >= 0 && j + y < squares) {
                if (!(x == 0 && y == 0)) {
                    vieti += grid[i + x][j + y];
                }
            }
        }
    }

    return vieti;
}
//-----------------------------------------
//functie pentru umplerea celulelor si a tablei
function fillGrid() {

    background(240);
    strokeWeight(2);
    stroke(0, 0, 0, 20);

    for (var i = 0; i < squares; i++) {
        for (var j = 0; j < squares; j++) {
            if (grid[i][j] == 1) {
                fill(187, 85, 107);             //pot sa modific cum vreau culoarea celulelor de aici
            } else {
                fill(255);
            }
            rect(i * matr, j * matr + 30, matr - 3, matr - 3);
        }
    }
}
//---------------------Functii pt scris
function write(words) {

    strokeWeight(2);
    stroke(255);
    fill(113, 162, 136);
    textSize(19);
    45, 167, 144
    text(words, 1, 20);
}

function write1(words) {

    strokeWeight(2);
    stroke(255);
    fill(45, 167, 144 );
    textSize(19);
    text(words, 1, 20);
}

function write2(words) {

    strokeWeight(2);
    stroke(255);
    fill(207, 167, 144 );
    textSize(19);
    text(words, 1, 20);
}

//----------------------------------------------------
function play() {

    startButton.hide();
    butonPress = true;
    textAlign(LEFT);
}
//------------------------
//functie pentru a creeapagina initiala

function pageInit() {

    textAlign(CENTER);

    background(211, 254, 253);
    textSize(width / 9);
    fill(99, 193, 185);
    
    text("The Game of Life", width / 2, 200);

    textAlign(LEFT);

    stroke(0, 0, 0, 20);
    strokeWeight(4);
    fill(187, 85, 107);
    rect(width / 9, 300, 35, 35);

    noStroke();
    textSize(width / 30);
    fill(187, 85, 107);
    text("Celule in viata", width / 9 + 45, 330);

    stroke(0, 0, 0, 20);
    strokeWeight(4);
    fill(255);
    rect(width / 2 + width / 13, 300, 35, 35);

    noStroke();
    textSize(width / 30);
    fill(99, 193, 185);
    text("Celule moarte", width / 2 + width / 13 + 40, 330);

    textAlign(CENTER);

    textSize(width / 31);
    fill(187, 85, 107);
    text("         1.Orice celula moarta care are 3 vecini in viata, devine vie", width / 2, 450);
    fill(99, 193, 185);
    text("     2.Orice celula cu mai putini de doi vecini in viata moare", width / 2, 500);
    fill(187, 85, 107);
    text("3.Orice celula cu mai mult de 3 vecini in viata moare", width / 2, 550);

}