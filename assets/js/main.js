////////////////// Theme //////////////////
if (localStorage.getItem("theme")) {
    theme(localStorage.getItem("theme"));

} else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme("dark");
    } else {
        theme("light");
    }
}


////////////////// Porfolio //////////////////
projets = projets.sort(function(a,b){
    a = a.date.split(/\//);
    b = b.date.split(/\//);
    return new Date([a[1], a[0], a[2]].join('/')).getTime() - new Date([b[1], b[0], b[2]].join('/')).getTime(); 
}).reverse();

var ptrad = [];
var pdev = [];
for (var projet of projets) {
    if (projet.type == "dev") {
        pdev.push(projet);
    } else if (projet.type == "trad") {
        ptrad.push(projet);
    }
}

if (document.getElementById("testimonials")) {
    var cards = "";
    var randomReviews = [];
    if (reviews.length > 2) {
        var random = reviews.sort(function() { return .5 - Math.random() }).slice(0, 2);
        randomReviews.push(random[0]);
        randomReviews.push(random[1]);
    } else {
        randomReviews = reviews;
    }

    for (var review of randomReviews) {
        var card = `
            <div class="col-lg-6 col-xl-6 col-xxl-6">
                <div class="card">
                    <div class="card-body pb-0">
                        <figure>
                            <blockquote class="blockquote">
                                <p class="mb-0" style="font-size: 16px;" lang-fr="<i class='fas fa-quote-left'></i>&nbsp;&nbsp;${review['avis']['fr']}" lang-en="<i class='fas fa-quote-left'></i>&nbsp;&nbsp;${review['avis']['en']}"></p>
                            </blockquote>
                            <figcaption class="blockquote-footer" lang-fr="${review['auteur']['fr']}" lang-en="${review['auteur']['en']}"></figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        `;
        cards += card;
        document.getElementById("testimonials").innerHTML = cards;
    }
}

if (document.getElementById("projetsDev")) {
    var cards = "";
    for (var dev of pdev) {
        var adulte = "";
        if (dev['adulte'] == true) {
            adulte = "<span class='badge bg-danger'>+18</span> ";
        }
        var liens = "";
        for (var lien of dev["liens"]) {
            var lienItem = `
                <a class="card-link" href="${lien['url']}" target="_blank" lang-fr="${lien['fr']}" lang-en="${lien['en']}"></a>
            `;
            liens += lienItem;
        }
        var card = `
            <div class="col">
                <div class="card my-2">
                    <div class="card-body">
                        <h4 class="card-title" lang-fr="${dev['titre']['fr']}" lang-en="${dev['titre']['en']}"></h4>
                        <h6 class="text-muted card-subtitle mb-2">${adulte}<span lang-fr="${dev['genre']['fr']}" lang-en="${dev['genre']['en']}"></span></h6>
                        <p class="card-text mb-1" lang-fr="${dev['desc']['fr']}" lang-en="${dev['desc']['en']}"></p>
                        ${liens}
                    </div>
                </div>
            </div>
        `;
        cards += card;
        document.getElementById("projetsDev").innerHTML = cards;
    }
}

if (document.getElementById("projetsTrad")) {
    var cards = "";
    for (var trad of ptrad) {
        var adulte = "";
        if (trad['adulte'] == true) {
            adulte = "<span class='badge bg-danger'>+18</span> ";
        }
        var liens = "";
        for (var lien of trad["liens"]) {
            var lienItem = `
                <a class="card-link" href="${lien['url']}" target="_blank" lang-fr="${lien['fr']}" lang-en="${lien['en']}"></a>
            `;
            liens += lienItem;
        }
        var card = `
            <div class="col">
                <div class="card my-2">
                    <div class="card-body">
                        <h4 class="card-title" lang-fr="${trad['titre']['fr']}" lang-en="${trad['titre']['en']}"></h4>
                        <h6 class="text-muted card-subtitle mb-2">${adulte}<span lang-fr="${trad['genre']['fr']}" lang-en="${trad['genre']['en']}"></span></h6>
                        <p class="card-text mb-1" lang-fr="${trad['desc']['fr']}" lang-en="${trad['desc']['en']}"></p>
                        ${liens}
                    </div>
                </div>
            </div>
        `;
        cards += card;
        document.getElementById("projetsTrad").innerHTML = cards;
    }
}


////////////////// Language //////////////////
var url = new URL(window.location.href);
if (url.searchParams.get("lang")) {
    setLang(url.searchParams.get("lang"));
    window.history.replaceState(null, null, window.location.pathname);
}

var userLang = navigator.language.substring(0,2).toLowerCase();
if (localStorage.getItem("lang") == "fr" || localStorage.getItem("lang") == "en") {
    setLang(localStorage.getItem("lang"));
} else if (localStorage.getItem("lang") === null && (userLang == "fr" || userLang == "en")) {
    setLang(userLang);
} else {
    setLang("fr");
}


////////////////// Contact //////////////////
window.onload = function() {
    if (document.getElementById('contact-form')) {
        emailjs.init("user_PQmA4barDNxHzfbFB8ZZE");
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            this.contact_number.value = Math.random() * 100000 | 0;
            emailjs.sendForm('martii-website', 'template_contactmartii', this).then(function() {
                document.getElementById('msg-success').style.display = "block";
                document.getElementById('contact-form').reset();
            }, function(error) {
                document.getElementById('msg-error').style.display = "block";
            });
        });
    }
}


////////////////// Navbar //////////////////
$(document).ready(function(){
     if($('main').length) {
        var stoptransparency = 200; // when to stop the transparent menu
        var hidingmenu = 1200; // when to hide the menu
     } else {
        var stoptransparency = -10;
        var hidingmenu = 99999;
     }
    var lastScrollTop = 0, delta = 5;
    $(this).scrollTop(0);
    $(window).on('scroll load resize', function() {
        var position = $(this).scrollTop();
        if(position > stoptransparency) {
            $('#transmenu').removeClass('transparency');
        } else {
            $('#transmenu').addClass('transparency');
        }
        if(Math.abs(lastScrollTop - position) <= delta)
            return;
        if (position > hidingmenu && position > lastScrollTop){
            $('#transmenu').fadeOut(600);
        } else {
            $('#transmenu').fadeIn(600);
        }
        lastScrollTop = position;  
    });
    
    $('#transmenu .dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('#transmenu .dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });
});


////////////////// Functions //////////////////
function theme(t) {
    var style = document.querySelector("link[href*='dark.css']");
    var lightBtn = document.getElementById("lightBtn");
    var darkBtn = document.getElementById("darkBtn");
    if (t == "light") {
        style.disabled = "disabled";
        lightBtn.style.display = "block";
        darkBtn.style.display = "none";
    } else if (t == "dark") {
        style.disabled = undefined;
        lightBtn.style.display = "none";
        darkBtn.style.display = "block";
    }
}

function setLang(lang) {
    localStorage.setItem("lang", lang);
    document.querySelectorAll('[lang-'+lang+']').forEach(function(element) {
        var trad = element.getAttribute('lang-'+lang);
        if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
            element.placeholder = trad;
        } else {
            element.innerHTML = trad;
        }
    });
}