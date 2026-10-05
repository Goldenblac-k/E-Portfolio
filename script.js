const nav = document.querySelector('nav');
const textHidden = document.querySelector('.textHidden');
const grille = document.getElementsByClassName("grille")[0];
const swipL = document.getElementById('swipLeft');
const swipR = document.getElementById('swipRight');
const container = document.getElementsByClassName('container')[0];
const img = document.getElementsByClassName('imagesProjet')[0];
const titre = document.getElementsByClassName('titre')[0];
const link = document.getElementsByClassName('link')[0];
const desc = document.getElementsByClassName('desc')[0];
const footer = document.querySelector('footer div');
const contact = footer.getElementsByClassName('contacts')[0];

contact.style.paddingLeft = "0px";

const Container = document.createElement('div');
Container.className = 'container';
Container.style.position = 'absolute';
Container.innerHTML = `
    <div class="imageBloc">
        <img class="imagesProjet" src="" alt="">
        <div>
            <div class="prev">⪻</div>
            <div class="next">⪼</div>
        </div>
    </div>

    <div class="textBloc">
        <div>
            <a href="#">
                <h2 class="titre">

                </h2>
            </a>

            <h3 class="desc">

            </h3>
        </div>
    </div>
`;

const Grille = document.createElement('div');
Grille.className = "grille";
Grille.style.position = "absolute";
Grille.innerHTML = `
    <div id="lig1">
        <p class="left hidder"></p>
        <p class="hidder"></p>
        <p class="hidder"></p>
        <p class="right hidder"></p>
    </div>

    <div id="lig2">
        <p class="left hidder"></p>
        <p class="hidder"></p>
        <p class="hidder"></p>
        <p class="right hidder"></p>
    </div>
`;

const Grille_p = Grille.querySelectorAll('p');
for (let i = 0; i < Grille_p.length; i++){
    if (i%3 == 0) Grille_p[i].style.backgroundColor = "#faaeae";
    if (i%3 == 1) Grille_p[i].style.backgroundColor = "#f3b9b9";
    if (i%3 == 2) Grille_p[i].style.backgroundColor = "#f1c5c5";
    if (i%3 == 0 && i > 2) Grille_p[i].style.backgroundColor = "#f1d3d3";
    if (i%3 == 1 && i > 6) Grille_p[i].style.backgroundColor = "#f3e3e3";
};

grille.parentNode.appendChild(Grille);

function resizeGrille(){
    Grille.style.height = grille.offsetHeight+"px";
    Grille.style.width = grille.offsetWidth+"px";
    Grille.style.top = grille.offsetTop+"px";
}

window.addEventListener('resize', () => {
    resizeGrille();
    textHidden.style.height = nav.parentNode.clientHeight + "px";
});

const projets = [
    {'titre': 'Mimesis', 'desc': "Mimesis est un jeu à choix narratifs en 2D dans lequel vous incarnez un testeur de sécurité qui a été embauché par le directeur du musée Mimesis afin de dérober une oeuvre et ainsi exposer les différentes failles de sécurité du lieu.", 'img': ['mimesis_main.png', 'mimesis_in_game.png', 'mimesis_end.png'], 'url': "https://github.com/Goldenblac-k/Mimesis"},
    {'titre': 'Astrogame', 'desc': "Astrogame est un jeu d'arcade en 2D dans lequel vous incarnez un astronaute qui a atterri sur Mars et qui doit survivre face à une pluie de météorites qui s'abat.", 'img': ['astrogame_main.png', 'astrogame_in_game.png', 'astrogame_end.png'], 'url': "https://github.com/Goldenblac-k/Astrogame"},
    {'titre': 'Game of life', 'desc': "Très connu jeu de la vie de John Conway recréé sous Python, dan lequel vous pouvez simuler le développement de cellules selon les règles initiales et un placement qui vous est propre. Existe en deux version : une version carte réduite à l'écran, et une version à carte exponentielle mais moins performante.", 'img': ["jeu_de_la_vie.jpg"], 'url': "https://github.com/Goldenblac-k/The-Game-Of-Life"}
];
var i_projets = 0;
var last_i = 0;

var images = [];
var i_images = 0;

var anim = false;

function navBarre() {
    for (var i = 0; i < nav.children.length; i++) {
        var div = nav.children[i];
        
        div.style.transform = "translateX(0)";
    };
    footer.style.transform = "translateY(0)";
    
    setTimeout(() => {
        footer.style.filter = "drop-shadow(0px 0px 5px #00000080)";
        nav.parentNode.style.filter = "drop-shadow(0px 5px 7px #00000084";
    }, 2000);   
}

function setContainer() {
    i_images = 0;
    try {
        images = projets[i_projets]['img'];
        img.src = images[i_images];
    } catch (e) {};
    titre.textContent = projets[i_projets]['titre'];
    link.href = projets[i_projets]['url'];
    desc.textContent = projets[i_projets]['desc'];
    container.style.transform = container.style.transform + " scale(1)";
    container.style.transition = 'none';
    container.style.transform = "translateX(0)";
    container.style.filter = "contrast(1)"
    anim = false;
    if (container.parentNode.children[3]) container.parentNode.children[3].remove();
}

function swipProject(dir) {
    if (i_projets != 0 && dir == "left" && anim == false) {
        i_projets --;
    } else if (i_projets != projets.length-1 && dir == "right" && anim == false) {
        i_projets++;
    };

    if (last_i != i_projets && anim == false) {
        anim = true;
        Container.style.height = container.offsetHeight+"px";
        Container.style.width = container.offsetWidth+"px";
        
        container.parentNode.appendChild(Container);
        
        const img2 = Container.getElementsByClassName('imagesProjet')[0];
        const titre2 = Container.getElementsByClassName('titre')[0];
        const desc2 = Container.getElementsByClassName('desc')[0];
        
        try {
            img2.src = projets[i_projets]['img'][0];
        } catch (e) {};
        titre2.textContent = projets[i_projets]['titre'];
        desc2.textContent = projets[i_projets]['desc'];

        Container.style.transition = "none";
        container.style.transition = '1s ease-in-out';
        
        if (dir == 'right'){
            Container.style.transform = "translateX(150%) scale(0.7)";
        } else {
            Container.style.transform = "translateX(-150%) scale(0.7)";
        };
        
        Container.style.filter = "contrast(0.7)";

        requestAnimationFrame(() => {
            void Container.offsetWidth;
            
            requestAnimationFrame(() => {
                Container.style.transition = '1s ease-in-out';
                
                if (dir == 'right'){
                    container.style.transform = "translateX(-150%) scale(0.7)";
                    container.style.filter = "contrast(0.7)"
                    Container.style.transform = "translateX(0)";
                    Container.style.filter = "contrast(1)"
                } else {
                    container.style.transform = "translateX(150%) scale(0.7)";
                    container.style.filter = "contrast(0.7)"
                    Container.style.transform = "translateX(0)";
                    Container.style.filter = "contrast(1)"
                };
            });
        });

        setTimeout(() => {
            setContainer();
        }, 1000);
        last_i = i_projets;
    };
}

function switchImage(dir) {
    if (i_images != 0 && dir == 'left' && anim == false){
        i_images--;
    } else if (i_images != images.length-1 && dir == 'right' && anim == false){
        i_images++;
    };

    img.src = images[i_images];
}

function scroll_to(targetId, duration = 1000) {
    const target = document.getElementById(targetId);

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    let desired = targetPosition - (window.innerHeight / 2) + (target.offsetHeight / 2);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    desired = Math.max(0, Math.min(maxScroll, desired));

    const start = window.pageYOffset;
    const distance = desired - start;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; 
    };

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);

        const newY = start + distance * eased;

        window.scrollTo(0, newY);

        if (elapsed < duration) {
            requestAnimationFrame(animation);
        };
    };

    requestAnimationFrame(animation);
}

window.addEventListener('load', () => {
    navBarre()
    resizeGrille()
});
