const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //bu fonksiyon oyunun başlangıç kısmına geri dönmemizi sağlar herşeyi sıfırlar.
    correctLetters = []; //dizi
    //dizisi oyuncunun doğru tahmin ettiği harfleri dizi halinde tutar.
    wrongGuessCount = 0;
    // oyun resetlendiği zaman yanlış tahmin edilen harfleri sıfırlar.
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    /*burada yanlış harfe basıldığında asma oyununda HTML'de img elementine erişir 
    harf sayısına bağlı olarak asma resimleri göstermeye yarar*/
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //bu kod HTML'deki doğru ve yanlış tahmin sayıların gösterir ve günceller.
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //bu kod klavye butonlarının hepsini aktif hale getirmesini sağlar.
    wordDisplay.innerHtml = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    /*bu kod wordDisplay değişkeniyle seçilen HTML elemanına yani ul koduna
    li elementleri oluşturur her bir harf li elemanı olarak gösterir.*/
    gameModal.classList.remove("show");
    //bu kod oyunun sonucunu gösteren pencerenin görünmesini kaldırır.


    /*innerText = bir HTML elementinin içeriğini temsil eden bir özelliktir.
    Bu özellik, seçilen bir HTML elementinin metin içeriğini değiştirmek veya okumak için kullanılır.*/

    /*innerHtml = innerHTML, bir elementin içeriğini HTML kodunu dikkate alarak
    değiştirmek veya okumak için kullanılır. Elementin herhangi bir içerik varsa,
    bu içerik üzerine yazılır veya bu içerik okunur.*/

    /*split("") = split("") yöntemi, bir JavaScript dizesini belirtilen bir ayraç karakteri veya boşlukları
    kullanarak parçalara böler ve bu parçaları bir diziye dönüştürür.
    Örneğin, "hello".split("") ifadesi kullanıldığında:
    "hello" dizesi karakterlere (h, e, l, l, o) ayrılır.
    Her bir karakter, bir dizi elemanı olarak alınır ve bu elemanlar bir diziye yerleştirilir.
    Sonuç olarak, ["h", "e", "l", "l", "o"] adında bir dizi elde edilir.*/

    /*.map() = fonksiyonu, bir dizi üzerinde döngü yaparak her bir elemana
    belirli bir işlem uygular ve bu işlemin sonucunu yeni bir dizi olarak döndürür.*/

    /*.join()= yöntemi, bir dizideki tüm elemanları birleştirerek bir dize oluşturur.
    Bu yöntem, bir dizideki elemanları bir araya getirip tek bir dize olarak almak için kullanılır.*/

    /* .remove() = yöntemi, bir HTML elementini DOM'dan kaldırmak için kullanılır.
    Bu yöntem, bir elementin üstündeki parent elementinden kaldırır ve bu sayede DOM'dan tamamen siler.
    Bu yöntem, modern tarayıcılar tarafından desteklenir.*/
};

const getRandomWord = () => {
    /*Bu fonksiyon oyunda rastgele bir kelime seçer bunu ise currentWord değişkenine gönderir
    ve bu fonksiyon kelime için ipucu gçstermesini sağlar ve resetgame fonksiyonunu çağır.*/
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    //bu kod rastgele bir kelime ve ipucu getirmesini sağlar.
    currentWord = word;
    /*bu kod word-list js dosyasından rastgele gelen bir kelimeyi bu değişkene atar
    currentWord değişkeni ise tahmin edilmeye çalışan kelimeyi tutmamızı sağlar.*/
    document.querySelector(".hint-text b").innerText = hint;
    //bu kod HTML'de hint kısmında bulunan <b> kısmını değiştirir.
    resetGame();

    /* Math.floor() = fonksiyonu, bir ondalıklı sayıyı en yakın daha küçük tam sayıya yuvarlar.
    Yani, verilen bir ondalıklı sayının küçük veya eşit olduğu en büyük tam sayıyı döndürür.*/

    /*Math.random() = JavaScript'te bir matematiksel fonksiyondur ve rastgele sayı üretmek için kullanılır.
    Bu fonksiyon, 0 ile 1 arasında (0 dahil, 1 hariç) rastgele bir ondalıklı sayı döndürür.*/
};

const gameOver = (isVictory) => {
    //Bu fonksiyon oyunun bitişini yönetir ve kazandığını veya kaybettiğini gösterir.
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was`;
        //bu kod oyuncunun sonucuna göre yazı belirtir.
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        //bu kod oyuncunun sonucuna bağlı olarak karşımıza görsel getirir.
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'lost'}.gif`;
        //bu kod "h4" etiketinin oyuncunun sonucuna göre değişmesini sağlar.
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        //bu kod "p" etiketinin oyuncunun sonucuna göre değişmesini sağlar.
        gameModal.classList.add("show");
        //oyuncunun sonucunu gçstermek için modal pencereyi kullanır.
    }, 300);//300 milisaniye anlamına gelir 300 milisaniye sonra modal pencereyi getirir.
};

const initGame = (button, clickedLetter) => {
    /*bu fonksiyon butonlarla ilgilidir tıklanan harf kelimede var ise doğru tahmin edilmiş
    listesine girer yanlış ise harf sayısı değişir, asma resmide değişir ve
    yanlış harf devre dışı bırakılır.*/
    if (currentWord.includes(clickedLetter)) {
    // burada oyuncunun seçtiği harfe bakılır mevcut kelimede var mı yok mu diye kontrol edilir.
        [...currentWord].forEach((letter, index) => {
    /*foreach döngüsü currentword dizisindeki kelimenin her elemanını kontrol eder.
    letter değişkeni currentword dizisinin o anki elemanını temsil eder.
    index değişkenide o anki elemanın konumunu temsil eder.*/
            if (letter === clickedLetter) {
                correctLetters, push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
            /*letter değişkeni seçtiğimiz herfe clickedletter dizisine eşit ise
            bu harf doğrudur ve bu harf correctletters dizisine eklenir
            daha sonra html'de ve css sınıfı güncellenir.*/
        });
    } else {
    //eğer seçilen harf doğru değil ise else koşulu çalışır.
        wrongGuessCount++;
        //yanlış tahmin edilen harf sayısı 1 artar.
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        //ve bu artan değişiklik görsel olarak gösterilir.
    }

    button.disabled = true;
    //seçilen harf yani buton devredışı bırakılır.
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //ve bu metin güncellenilir maxguesses gösterilir.


    if (wrongGuessCount === maxGuesses) return gameOver(false);
    //Eğer oyuncu kaybederse (wrongGuessCount === maxGuesses), gameOver(false) fonksiyonu çağrılır.
    if (correctLetters.length === currentWord.length) return gameOver(true);
    //Eğer oyuncu kazanırsa (correctLetters.length === currentWord.length), gameOver(true) fonksiyonu çağrılır. */


    /*includes() = JavaScript'te bir dizi veya dize içinde belirli bir öğenin bulunup bulunmadığını kontrol etmek için kullanılan bir yöntemdir.*/
};

//klavye oluşturma ve oyunun başında bir kelime seçer ve oyun başlar.
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));

    /*document.createElement() JavaScript'te bir DOM (Document Object Model)
    yöntemidir ve belirtilen bir HTML elementini oluşturur. */
    
    /*String.fromCharCode() JavaScript'te bir metinsel fonksiyondur ve
    Unicode karakter kodlarını kullanarak karakterlerin bir dizisini oluşturur.
    Bu fonksiyon, Unicode karakter kodlarını alır ve bu kodlara karşılık gelen karakterleri içeren bir dize oluşturur.*/
};

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
//oyunu yeniden başlatma butonu.