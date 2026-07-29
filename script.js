/*==================================================
 Birthday Website V4
 Final Script
 Part 3A
==================================================*/

/*==========================
 Elements
==========================*/

const scenes = [...document.querySelectorAll(".scene")];

const loadingScreen = document.getElementById("loadingScreen");
const transitionLayer = document.getElementById("transitionLayer");

const music = document.getElementById("bgMusic");

const openGift = document.getElementById("openGift");
const continueButton = document.getElementById("continueButton");
const wishButton = document.getElementById("wishButton");

const secretStar = document.getElementById("secretStar");
const popup = document.getElementById("starPopup");
const closePopup = document.getElementById("closePopup");

/*==========================
 DOB
==========================*/

const DOB = new Date("2001-07-30T00:00:00");

/*==========================
 Timeline
==========================*/

let currentScene = "scene1";

let sceneTimer = null;

/*==========================
 Wait Helper
==========================*/

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

/*==========================
 Scene Lookup
==========================*/

function getScene(id){

    return document.getElementById(id);

}

/*==========================
 Show Scene
==========================*/

function showScene(id){

    scenes.forEach(scene=>{

        scene.classList.remove("active");

    });

    const target = getScene(id);

    if(target){

        target.classList.add("active");

        currentScene=id;

    }

}

/*==========================
 Fade Transition
==========================*/

async function transition(id){

    // Black screen fades in
    transitionLayer.classList.add("show");

    await wait(1000);

    // Hide every scene completely
    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    await wait(150);

    // Show the next scene
    showScene(id);

    await wait(150);

    // Fade black screen away
    transitionLayer.classList.remove("show");

}
/*==========================
 Safe Timer
==========================*/

function clearSceneTimer(){

    if(sceneTimer){

        clearTimeout(sceneTimer);

        sceneTimer=null;

    }

}

function nextScene(id,time){

    clearSceneTimer();

    sceneTimer=setTimeout(()=>{

        transition(id);

    },time);

}

/*==========================
 Loading
==========================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loadingScreen.style.opacity="0";

        setTimeout(()=>{

            loadingScreen.style.display="none";

        },900);

    },800);

});

/*==================================================
 Birthday Website V4
 Final Script
 Part 3B
==================================================*/


/*==========================
 Timeline Order
==========================*/

const timeline = [

    "scene2",
    "scene3",
    "scene4",
    "scene5",
    "scene6",
    "scene7"

];


/*==========================
 Scene Durations
==========================*/

const duration={

    scene2:8000,

    scene3:15000,

    scene4:30000,

    scene5:20000,

    scene6:25000

};


/*==========================
 Timeline Engine
==========================*/

async function playTimeline(){

    await transition("scene2");
    await wait(8000);

    await transition("scene3");
    startCounter();
    await wait(15000);

    await transition("scene4");
    await animateMessages(
        "#reflectionContainer",
        reflectionMessages,
        5000
    );

    await transition("scene5");
    await animateMessages(
        "#appreciationContainer",
        appreciationMessages,
        2200
    );

    await transition("scene6");
    await animateMessages(
        "#futureContainer",
        futureMessages,
        1800
    );

    await transition("scene7");
}


/*==========================
 Open Gift
==========================*/

let openingStarted = false;

openGift.addEventListener("click", async () => {

    if (openingStarted) return;
    openingStarted = true;

    try {
        await music.play();
    } catch (err) {
        console.warn(err);
    }

    playTimeline();
});
/*==========================
 Continue Letter
==========================*/

continueButton.addEventListener("click", async () => {

    await transition("scene8");

    startHopeSequence();

});


/*==========================
 Secret Star
==========================*/

secretStar.addEventListener("click",()=>{

    popup.classList.add("show");

});


closePopup.addEventListener("click",()=>{

    popup.classList.remove("show");

});

/*==================================================
 Birthday Website V4
 Final Script
 Part 3C
==================================================*/


/*==========================
 Journey Counter
==========================*/

let counterInterval;

function updateCounter(){

    const now = new Date();
    const diff = now - DOB;

    const totalSeconds = Math.floor(diff / 1000);
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    let years = now.getFullYear() - DOB.getFullYear();

    let months =
        years * 12 +
        (now.getMonth() - DOB.getMonth());

    if(now.getDate() < DOB.getDate()){
        months--;
    }

    if(
        now.getMonth() < DOB.getMonth() ||
        (
            now.getMonth() === DOB.getMonth() &&
            now.getDate() < DOB.getDate()
        )
    ){
        years--;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("weeks").textContent = totalWeeks.toLocaleString();
    document.getElementById("days").textContent = totalDays.toLocaleString();
    document.getElementById("seconds").textContent = totalSeconds.toLocaleString();
}

function startCounter(){

    updateCounter();

    clearInterval(counterInterval);

    counterInterval = setInterval(updateCounter,1000);

}


/*==========================
 Reflection Text
==========================*/

const reflectionMessages=[

" Every year adds to your story Naveen,<br>But it's your kindness that gives it a meaning..",

" It's not about how many years you've lived,<br> It's about how much love you've shared .",

"Remember smallest moments<br>become the greatest memories."

];


/*==========================
 Appreciation Text
==========================*/

const appreciationMessages=[

"Take a moment, ",

"to pause, ",

"to breathe and to appreciate",

"your journey of,",

"Twenty-five years ...",

"countless memories...",

"one beautiful story."

];


/*==========================
 Looking Ahead
==========================*/

const futureMessages= [

"Naveen",

"Wherever life takes you next",

"I hope you always find reasons",

"to smile.",

"May every sunrise brings you hope.",

"And every sunset brings you peace",

"May life always be gentle with you.🤍 " 

];


/*==========================
 Text Animator
==========================*/

async function animateMessages(containerId, messages, duration){

    const text = document.querySelector(containerId + " .animatedText");

    for(const line of messages){

        text.classList.remove("show");

        await wait(500);

        text.innerHTML = "";

        await wait(100);

        text.innerHTML = line;

        text.classList.add("show");

        await wait(duration);

    }

    // Fade out the last sentence
    text.classList.remove("show");

    await wait(700);

    text.innerHTML = "";
}

/*==========================
 Scene Animations
==========================*/

function playReflection(){

    animateMessages(

        "#reflectionContainer",

        reflectionMessages,

        5000

    );

}


function playAppreciation(){

    animateMessages(

        "#appreciationContainer",

        appreciationMessages,

        2200

    );

}


function playFuture(){

    animateMessages(

        "#futureContainer",

        futureMessages,

        1800

    );

}

/*==================================================
 Birthday Website V4
 Final Script
 Part 3D
==================================================*/


/*==========================
 Hope Messages
==========================*/

const hopeMessages=[

    "✨ May your smile never fade.<br>Make sure you always chase the sunrise.✨",

    "✨ May happiness find you in each and every moment,and you let your heart lead.✨",

    "✨ May every dream lead you somewhere beautiful and helps you to find magic in the little moments.✨",

    "✨ May every challenge make you stronger, and you keep becoming your best version.✨",

    "✨ May you always be surrounded by people who truly value you.✨",

    "✨ May your heart always stay as kind as it is.✨",

    "✨ May peace always find its way to you.✨",

    "✨ May you never forget your worth.✨",

    "✨ May this year become your most beautiful chapter.✨",

    "✨ May you always find your way back to happiness—and to yourself. 🤍"

];


/*==========================
 Future Chapter
==========================*/

const futureChapter=[

    " 📖 Twenty-five chapters written.",

    " 🌿 Countless more waiting to be lived.",

    " 🌅 The best stories are still ahead Mr Naveenkumar S."

];


/*==========================
 Hope Scene
==========================*/

async function startHopeSequence(){

    await animateMessages(

        "#hopeContainer",

        hopeMessages,

        5000

    );

    await transition("scene9");

    await startFutureChapter();

}


/*==========================
 Future Scene
==========================*/

async function startFutureChapter(){

    await animateMessages(

        "#futureChapterContainer",

        futureChapter,

        5000

    );

    await transition("scene10");

}


/*==========================
 Wish Button
==========================*/

wishButton.addEventListener(

    "click",

    async()=>{

       transitionLayer.classList.add("show");

await wait(3000);

transitionLayer.classList.remove("show");

        await transition("scene11");

        launchCelebration();

        await wait(15000);

        fadeMusic();

        await transition("scene12");

    }

);


/*==========================
 Music Fade
==========================*/

function fadeMusic(){

    let volume=music.volume;

    const fade=setInterval(()=>{

        volume-=0.05;

        if(volume<=0){

            volume=0;

            clearInterval(fade);

            music.pause();

        }

        music.volume=volume;

    },300);

}

/*==================================================
 Birthday Website V4
 Final Script
 Part 3E
 Fireworks
==================================================*/


/*==========================
 Canvas
==========================*/

const fireCanvas =
document.getElementById("fireworksCanvas");

const fireCtx =
fireCanvas.getContext("2d");


function resizeFireCanvas(){

    fireCanvas.width =
    window.innerWidth;

    fireCanvas.height =
    window.innerHeight;

}

resizeFireCanvas();

window.addEventListener(

    "resize",

    resizeFireCanvas

);


/*==========================
 Firework Particle
==========================*/

class FireParticle{

    constructor(x,y,color){

        this.x=x;

        this.y=y;

        this.radius=
        Math.random()*3+1;

        this.color=color;

        this.life=100;

        this.velocity={

            x:(Math.random()-0.5)*8,

            y:(Math.random()-0.5)*8

        };

    }

    update(){

        this.x+=this.velocity.x;

        this.y+=this.velocity.y;

        this.velocity.y+=0.05;

        this.life--;

    }

    draw(){

        fireCtx.beginPath();

        fireCtx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI*2

        );

        fireCtx.fillStyle=this.color;

        fireCtx.fill();

    }

}


/*==========================
 Fireworks
==========================*/

let fireworks=[];


function explode(x,y){

    const colors=[

        "#FFD700",

        "#FFFFFF",

        "#FFE4B5",

        "#F8F8FF",

        "#FFFACD"

    ];

    for(let i=0;i<80;i++){

        fireworks.push(

            new FireParticle(

                x,

                y,

                colors[

                    Math.floor(

                        Math.random()*colors.length

                    )

                ]

            )

        );

    }

}


/*==========================
 Firework Animation
==========================*/

function animateFireworks(){

    fireCtx.clearRect(

        0,

        0,

        fireCanvas.width,

        fireCanvas.height

    );

    fireworks.forEach(

        (particle,index)=>{

            particle.update();

            particle.draw();

            if(particle.life<=0){

                fireworks.splice(

                    index,

                    1

                );

            }

        }

    );

    requestAnimationFrame(

        animateFireworks

    );

}

animateFireworks();


/*==========================
 Launch
==========================*/

function launchCelebration(){

    explode(

        window.innerWidth*0.5,

        window.innerHeight*0.3

    );

    setTimeout(()=>{

        explode(

            window.innerWidth*0.25,

            window.innerHeight*0.45

        );

    },500);

    setTimeout(()=>{

        explode(

            window.innerWidth*0.75,

            window.innerHeight*0.35

        );

    },1000);

    setTimeout(()=>{

        explode(

            window.innerWidth*0.45,

            window.innerHeight*0.55

        );

    },1500);

}

/*==================================================
 Birthday Website V4
 Final Script
 Part 3F
 Confetti • Stars • Particles
==================================================*/


/*==========================
 Confetti Canvas
==========================*/

const confettiCanvas =
document.getElementById("confettiCanvas");

const confettiCtx =
confettiCanvas.getContext("2d");

function resizeConfettiCanvas(){

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

}

resizeConfettiCanvas();

window.addEventListener(
    "resize",
    resizeConfettiCanvas
);


/*==========================
 Confetti
==========================*/

const confetti = [];

class Confetti{

    constructor(){

        this.x = Math.random()*confettiCanvas.width;
        this.y = -20;

        this.size = Math.random()*8+4;

        this.speed = Math.random()*3+2;

        this.rotation = Math.random()*360;

        this.rotationSpeed =
        Math.random()*8-4;

        this.color = [

            "#FFD700",
            "#FFFFFF",
            "#FFE8A3",
            "#FFF7D8"

        ][Math.floor(Math.random()*4)];

    }

    update(){

        this.y += this.speed;

        this.rotation += this.rotationSpeed;

    }

    draw(){

        confettiCtx.save();

        confettiCtx.translate(
            this.x,
            this.y
        );

        confettiCtx.rotate(
            this.rotation*Math.PI/180
        );

        confettiCtx.fillStyle=this.color;

        confettiCtx.fillRect(

            -this.size/2,

            -this.size/2,

            this.size,

            this.size

        );

        confettiCtx.restore();

    }

}


function animateConfetti(){

    confettiCtx.clearRect(

        0,

        0,

        confettiCanvas.width,

        confettiCanvas.height

    );

    for(let i=confetti.length-1;i>=0;i--){

        confetti[i].update();

        confetti[i].draw();

        if(

            confetti[i].y>

            confettiCanvas.height+30

        ){

            confetti.splice(i,1);

        }

    }

    requestAnimationFrame(

        animateConfetti

    );

}

animateConfetti();


function launchConfetti(){

    let amount = 180;

    const rain = setInterval(()=>{

        confetti.push(

            new Confetti()

        );

        amount--;

        if(amount<=0){

            clearInterval(rain);

        }

    },30);

}


/*==========================
 Upgrade Celebration
==========================*/

const oldCelebration = launchCelebration;

launchCelebration = function(){

    oldCelebration();

    launchConfetti();

};


/*==========================
 Floating Stars
==========================*/

function buildStars(){

    const sky =

    document.getElementById(

        "floatingStars"

    );

    if(!sky) return;

    for(let i=0;i<120;i++){

        const star=

        document.createElement("div");

        star.className="star";

        star.style.left=

        Math.random()*100+"%";

        star.style.top=

        Math.random()*100+"%";

        star.style.animationDelay=

        Math.random()*5+"s";

        star.style.animationDuration=

        (3+Math.random()*4)+"s";

        sky.appendChild(star);

    }

}


/*==========================
 Background Particles
==========================*/

function buildParticles(){

    const layer =

    document.getElementById(

        "particles"

    );

    if(!layer) return;

    for(let i=0;i<35;i++){

        const p=

        document.createElement("div");

        p.style.position="absolute";

        p.style.width="3px";

        p.style.height="3px";

        p.style.borderRadius="50%";

        p.style.background="white";

        p.style.opacity=".18";

        p.style.left=

        Math.random()*100+"%";

        p.style.top=

        Math.random()*100+"%";

        p.style.animation=

        "float "+(5+Math.random()*8)+"s infinite";

        layer.appendChild(p);

    }

}

/*==================================================
 Birthday Website V4
 Final Script
 Part 3G
 Final Initialization
==================================================*/


/*==========================
 Music Volume
==========================*/

music.volume = 0.55;


/*==========================
 Initialize Website
==========================*/

window.addEventListener("load",()=>{

    buildStars();

    buildParticles();

    showScene("scene1");

});


/*==========================
 Safety Checks
==========================*/

if(!music){

    console.warn("Music file not found.");

}

if(!fireCanvas){

    console.warn("Fireworks canvas missing.");

}

if(!confettiCanvas){

    console.warn("Confetti canvas missing.");

}





/*==========================
 Keyboard Shortcut
 Secret Star
==========================*/

document.addEventListener("keydown",(e)=>{

    if(e.key.toLowerCase()==="s"){

        popup.classList.add("show");

    }

});


/*==========================
 Close Popup
==========================*/

window.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});


/*==========================
 End Scene
==========================*/

function endMovie(){

    fadeMusic();

}


/*==========================
 Performance
==========================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        music.pause();

    }

    else{

        if(openingStarted){

            music.play().catch(()=>{});

        }

    }

});


/*==========================
 Finished
==========================*/

console.log(

"🎉 Birthday Website Loaded Successfully."

); 