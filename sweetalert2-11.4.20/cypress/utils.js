/*
1. Створення блоку start.
  1.1. Вибір  скіну ігрока
  1.2. Клік кнопки старт - ховати блок start і показувати блок StartBattle.
2. Створення блоку sound.
  2.2 Клік по кнопці, включення плеєра
  2.3.Заміна картинок images/mute на  images/on
3. Створення блоку StartBattle.
  3.1. Створення і рух enemy1, enemy2.
  3.2 Створення і рух ігрока(човен).
  3.3. Створення і рух зброї(ракета).
4. Створення блоку Score.  
5. Створення блоку EndGame.
6. Попадання по ворогу.
7. Зменшення кількості життя при попаданні.
8. Рахунок балів 
9. Створення вибуху 
10. поява ворога в випадковому місці екрана 
11 поява випадкового скіна ворога
12 додавання звуку при попаданні
13 додавання звуку вистріла
14. функція кінець гри
15 вивід кількості балів в кінці гри 
16 функція рестарт
17 функції для вибору скіна

*/
// створення ворогів
// при виході за межі поля видалення ворога, та запуск функції для створення нового

// оголошення перемінних 
audioPlayer = document.querySelector("audio");
soundImg = document.querySelector("#sound img")
startDiv = document.querySelector("#start");
gameDiv = document.querySelector("#game");
starBtn = document.querySelector("#start button");
let scoreDiv = document.querySelector("#score span");

let countScore = 0;

let countLifes = 1;

gamerSkin = "skin_1";

let sound = "off";
//  функція плеєр зі зміною картинки та програванням, зупинкою трека
soundImg.onclick = function() {
    if(sound == "on") {
        sound = "off";
        soundImg.src = "images/mute.png";
        audioPlayer.pause();

    } else {
        soundImg.src = "images/on.png";
        sound = "on";
        audioPlayer.play();
    }
}

// функція яка  спрацьовує при натисканні на кнопку старт
starBtn.onclick = function() {
    startBattle();
}

// функція яка стару 
function startBattle() {
    startDiv.style.display ="none";
    gameDiv.style.display ="block";
        
    gamer.className = gamerSkin;
    createLifes();
    createEnemyShip();
}

gamer = document.querySelector("#player");
// функція для керування  човнем
document.onkeydown = function(event) {
     if(event.keyCode == 65) {
        if(gamer.offsetLeft > 70 ) {
            gamer.style.left = gamer.offsetLeft - 70 + "px";
        }
      }

      if(event.keyCode == 68) {
        if(gamer.offsetLeft < document.querySelector("#app").clientWidth - 100) {
            gamer.style.left = gamer.offsetLeft + 70 + "px";
        }
      }
        if(event.keyCode == 32) {
            createRocket();
                let track = document.querySelector("#shot");
                    track.play();
        }   
}

/* Функції для роботи з ворожими човнами */

// Cтворення ворожих кораблів 
function createEnemyShip() {
    let enemy = document.createElement("div");
        enemy.className = "enemy " + typeEnemyShip();
        enemy.style.left = random(100,document.querySelector("#app").clientWidth - 150) + "px";
        gameDiv.appendChild(enemy);

    moveEnemyShip(enemy);
}

// функція появи рандомного ворога
function typeEnemyShip() {
    if(random(1, 2) == 1) {// рандом чисел
        return "type-1";//  повертає скіни ворога по його id
    } else {
        return "type-2";
    }
}

// функція з прописаним рухом ворожих кораблів
function moveEnemyShip(enemy) {
    let timerId = setInterval(function() {
        enemy.style.top = enemy.offsetTop + 10 + "px";
        if(enemy.offsetTop > 800) {
             enemy.remove();
             createEnemyShip();
             clearInterval(timerId);
             destruction();
        }
    }, 200)
}

//  функція створення зброї - ракети  
function createRocket() {
    let rocket = document.createElement("div");
    rocket.className = "rocket";
    rocket.style.left = gamer.offsetLeft +  "px";
    gameDiv.appendChild(rocket);
    moveRocket(rocket);
}

// геометрія руху
function moveRocket(rocket) {
    let timerID = setInterval(function() {
        rocket.style.top = rocket.offsetTop - 5 + "px";
        if (rocket.offsetTop < -10) {
            rocket.remove();
            clearInterval(timerID);
        }
        isExplosion(rocket);
    }, 10)
}
/*
cтворити елемент  дів
вказати класнейм
вказати ширину та висоту розташування вибуху
вставити створений елемент в дів
сет таймер, знищення нашої перемінно за 1 сек
*/
//  створення вибуху,де беруться 2 аргументи з розташуванням вибуху та його створення в html
function createExplosion(left, top) {
    let explosion = document.createElement("div");
        explosion.className = "explosion";
        explosion.style.left = left - 15 + "px";
        explosion.style.top = top - 100 + "px";
    gameDiv.appendChild(explosion);
    setTimeout(function() { // видаляємо човен. Аудіо при попаданні
        explosion.remove();
        let track = document.querySelector("#song");
            track.play();
    }, 1000)
}

// функція пропису розташування, спрацювання самого вибуху 
function isExplosion(rocket) {
    let enemy = document.querySelector(".enemy");
        if(countLifes <= 0) {
             rocket.remove();
            }  else if(rocket.offsetLeft > enemy.offsetLeft - 50
            && rocket.offsetLeft < enemy.offsetLeft + enemy.clientWidth - 20
            && rocket.offsetTop < enemy.offsetTop ) {
                createExplosion(rocket.offsetLeft, rocket.offsetTop)
                rocket.remove();
                enemy.remove();
                
                countScore = countScore + 1;
                scoreDiv.innerHTML = countScore; // присвюємо пустоту, щоб життів спочатку не було
                let span = document.createElement("span");//  створюємо тег span
                    gameDiv.appendChild(span); // вставляємо його в parent тег
                switch(countScore) {
                    case 1:
                        Swal("Good");
                        break;
                    case 10:
                        alert("Awesome");
                        break;
                    case 15:
                        alert("Amazing");
                        break;
                    case 20:
                        alert("Adorable");   
                        break; 
                    } 
                createEnemyShip();
            }
}



// функція дли знищення нашого човна 
function destruction() {
    countLifes = countLifes - 1;// происвоєння що кожний рах значення буде відніматися на один
    if(countLifes <= 0) {// умова при якій відбуваються наступні дії
        endGame();
    }
    createLifes();
}


let lifesDiv = document.querySelector("#lifes");// ініціалізація нашої змінною по id
function createLifes() {
    lifesDiv.innerHTML = "";// при запуску наша функція очищала поле
    let count = 0; //  початкова кількість 
    while(countLifes > count) { //  умова виконується поки true, тобто поки 3 > 0
        let span = document.createElement("span");// створюємо тег
            count = count + 1;// ітерація
        lifesDiv.appendChild(span);// вставляємо наш тег в div="lifes";
        
    }
}

// отримання рандомного числа та за допомогою .round() його округлення в більшу сторону
function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
// кінець гри 
function endGame() {
    gameDiv.innerHTML = "";
    let endDiv = document.querySelector("#end");
        endDiv.style.display = "block";

    let scoreBlock = document.querySelector("#end h3 span");    
        scoreBlock.innerHTML = scoreDiv.innerHTML;
    let restartBtn = document.querySelector("#end button");
        restartBtn.onclick = restart;
}       

//  функція перезавантаження сторінки 
function restart() { 
    location.reload();
}

selectSkin1 = document.querySelector("#skin_1");
// функція вибору скіна героя 
selectSkin1.onclick = function() {
    selectSkin1.className = "selected";// вибраній 1 картинці
    selectSkin2.className = "";// пустота
    gamerSkin = "skin_1";// вибираємо id="skin_1"
}
selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function() {
    selectSkin2.className = "selected";
    selectSkin1.className = "";
    gamerSkin = "skin_2";// вибираємо id="skin_2"
}

