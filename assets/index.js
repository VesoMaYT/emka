window.addEventListener("DOMContentLoaded", () => {

    // podstawowe dane
    document.getElementById("name").value = "Jan";
    document.getElementById("surname").value = "Kowalski";
    document.getElementById("nationality").value = "POLSKIE";
    document.getElementById("familyName").value = "KOWALSKI";
    document.getElementById("fathersFamilyName").value = "KOWALSKI";
    document.getElementById("mothersFamilyName").value = "NOWAK";

    // miejsce
    document.getElementById("birthPlace").value = "Wrocław";
    document.getElementById("countryOfBirth").value = "POLSKA";
    document.getElementById("adress1").value = "Kwiatowa 12";
    document.getElementById("adress2").value = "50-001";
    document.getElementById("city").value = "Wrocław";

    // pesel (możesz zmienić)
    document.getElementById("pesel").value = "00010112345";

    // data urodzenia
    const dateInputs = document.querySelectorAll(".date_input");
    if (dateInputs.length === 3) {
        dateInputs[0].value = "01"; // dzień
        dateInputs[1].value = "01"; // miesiąc
        dateInputs[2].value = "2000"; // rok
    }

});

function generatePesel(day, month, year, sex) {
    if (!day || !month || !year) return "";

    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    let monthCode = month;

    if (year >= 2000) {
        monthCode += 20;
    }

    const yearPart = year.toString().slice(-2).padStart(2, "0");
    const monthPart = monthCode.toString().padStart(2, "0");
    const dayPart = day.toString().padStart(2, "0");

    // losowa końcówka
    let random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

    // płeć
    let sexDigit;
    if (sex === "k") {
        sexDigit = [0,2,4,6,8][Math.floor(Math.random()*5)];
    } else {
        sexDigit = [1,3,5,7,9][Math.floor(Math.random()*5)];
    }

    let base = yearPart + monthPart + dayPart + random + sexDigit;

    // checksum
    const weights = [1,3,7,9,1,3,7,9,1,3];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(base[i]) * weights[i];
    }

    const control = (10 - (sum % 10)) % 10;

    return base + control;
}

let peselLocked = false;

document.getElementById("pesel").addEventListener("input", (e) => {
    peselLocked = true;

    const value = e.target.value;

    if (value.length === 11) {
        if (!validatePesel(value)) {
            e.target.style.border = "2px solid red";
        } else {
            e.target.style.border = "";
        }
    }
});

function updatePesel() {
    if (peselLocked) return;

    const dateInputs = document.querySelectorAll(".date_input");

    const day = dateInputs[0].value;
    const month = dateInputs[1].value;
    const year = dateInputs[2].value;

    if (day && month && year) {
        const pesel = generatePesel(day, month, year, sex);
        document.getElementById("pesel").value = pesel;
    }
}

const maleNames = [
"Jan","Adam","Piotr","Michał","Krzysztof","Tomasz","Paweł","Marcin","Jakub","Mateusz",
"Łukasz","Kamil","Sebastian","Dominik","Patryk","Karol","Dawid","Grzegorz","Rafał","Szymon"
];

const femaleNames = [
"Anna","Katarzyna","Agnieszka","Magdalena","Maria","Ewa","Joanna","Natalia","Aleksandra","Karolina",
"Monika","Paulina","Dominika","Marta","Justyna","Sylwia","Patrycja","Weronika","Klaudia","Barbara"
];

const surnamesBase = [
"Kowalski","Nowak","Wiśniewski","Wójcik","Kamiński","Lewandowski","Zieliński","Szymański",
"Woźniak","Dąbrowski","Kozłowski","Jankowski","Mazur","Krawczyk","Piotrowski","Grabowski",
"Zając","Pawłowski","Michalski","Król"
];

function adjustSurnameForSex(surname, sex) {
    if (sex === "k") {
        return surname
            .replace("ski","ska")
            .replace("cki","cka")
            .replace("dzki","dzka");
    }
    return surname;
}

const cities = [
"Wrocław","Warszawa","Kraków","Poznań","Gdańsk","Łódź","Szczecin","Bydgoszcz","Lublin",
"Katowice","Białystok","Gdynia","Częstochowa","Radom","Toruń","Rzeszów","Opole","Kielce"
];

const streets = [
"Kwiatowa","Słoneczna","Leśna","Szkolna","Polna","Krótka","Ogrodowa","Lipowa","Brzozowa",
"Topolowa","Akacjowa","Jesionowa","Wiosenna","Letnia","Jesienna","Zimowa","Spacerowa","Parkowa"
];

const dataPL = {
    Wrocław: {
        codes: ["50-001","50-002","50-003","50-004","50-005","50-006"],
        streets: ["Legnicka","Grabiszyńska","Powstańców Śląskich","Świdnicka","Traugutta","Hallera","Krzywoustego","Jedności Narodowej"]
    },
    Warszawa: {
        codes: ["00-001","00-002","00-003","00-004","00-005"],
        streets: ["Marszałkowska","Puławska","Aleje Jerozolimskie","Targowa","Modlińska","Grochowska","Wolska","Żwirki i Wigury"]
    },
    Kraków: {
        codes: ["30-001","30-002","30-003","30-004"],
        streets: ["Długa","Karmelicka","Wielicka","Nowohucka","Zakopiańska","Kalwaryjska","Mogilska"]
    },
    Poznań: {
        codes: ["60-001","60-002","60-003"],
        streets: ["Głogowska","Dąbrowskiego","Grunwaldzka","Hetmańska","Winogrady","Piątkowska"]
    },
    Gdańsk: {
        codes: ["80-001","80-002","80-003"],
        streets: ["Grunwaldzka","Kartuska","Słowackiego","Chłopska","Kołobrzeska"]
    },
    Łódź: {
        codes: ["90-001","90-002","90-003"],
        streets: ["Piotrkowska","Zgierska","Rzgowska","Pabianicka","Włókniarzy"]
    },
    Szczecin: {
        codes: ["70-001","70-002"],
        streets: ["Wojska Polskiego","Mickiewicza","Krasińskiego","Struga","Gdańska"]
    },
    Bydgoszcz: {
        codes: ["85-001","85-002"],
        streets: ["Gdańska","Fordońska","Nakielska","Jagiellońska"]
    },
    Lublin: {
        codes: ["20-001","20-002"],
        streets: ["Krakowskie Przedmieście","Lipowa","Zana","Kunickiego"]
    },
    Katowice: {
        codes: ["40-001","40-002"],
        streets: ["Chorzowska","Mikołowska","Kościuszki","Warszawska"]
    },
    Białystok: {
        codes: ["15-001","15-002"],
        streets: ["Lipowa","Sienkiewicza","Piłsudskiego","Antoniukowska"]
    },
    Gdynia: {
        codes: ["81-001","81-002"],
        streets: ["Świętojańska","Morska","Chwaszczyńska","Władysława IV"]
    },
    Częstochowa: {
        codes: ["42-200","42-201"],
        streets: ["Aleja Najświętszej Maryi Panny","Warszawska","Krakowska"]
    },
    Radom: {
        codes: ["26-600","26-601"],
        streets: ["Żeromskiego","11 Listopada","Kielecka","Struga"]
    },
    Toruń: {
        codes: ["87-100","87-101"],
        streets: ["Szeroka","Grudziądzka","Lubicka","Szosa Chełmińska"]
    },
    Rzeszów: {
        codes: ["35-001","35-002"],
        streets: ["Piłsudskiego","Rejtana","Lwowska","Dąbrowskiego"]
    },
    Opole: {
        codes: ["45-001","45-002"],
        streets: ["Ozimska","Katowicka","Niemodlińska","Wrocławska"]
    },
    Kielce: {
        codes: ["25-001","25-002"],
        streets: ["Sienkiewicza","Warszawska","Krakowska","Tarnowska"]
    }
};

const maleNamesByYear = {
    old: ["Jan","Andrzej","Krzysztof","Tomasz","Piotr"],
    mid: ["Michał","Paweł","Marcin","Łukasz","Kamil"],
    young: ["Jakub","Mateusz","Dawid","Szymon","Kacper"]
};

const femaleNamesByYear = {
    old: ["Anna","Maria","Katarzyna","Agnieszka"],
    mid: ["Magdalena","Joanna","Monika","Natalia"],
    young: ["Oliwia","Julia","Zuzanna","Lena","Maja"]
};

function getNameByYear(year, sex) {
    let group;

    if (year < 1990) group = "old";
    else if (year < 2010) group = "mid";
    else group = "young";

    return sex === "m"
        ? randomFrom(maleNamesByYear[group])
        : randomFrom(femaleNamesByYear[group]);
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function validatePesel(pesel) {
    if (!/^\d{11}$/.test(pesel)) return false;

    const weights = [1,3,7,9,1,3,7,9,1,3];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(pesel[i]) * weights[i];
    }

    const control = (10 - (sum % 10)) % 10;

    return control === parseInt(pesel[10]);
}

function generatePerson() {

    // płeć
    sex = Math.random() > 0.5 ? "m" : "k";

    // data
    const year = Math.floor(Math.random() * 40) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    // imię dopasowane do wieku
    const name = getNameByYear(year, sex);

    // nazwisko + odmiana
    const baseSurname = randomFrom(surnamesBase);
    const surname = adjustSurnameForSex(baseSurname, sex);

    const fatherSurname = baseSurname.toUpperCase();
    const motherSurname = adjustSurnameForSex(randomFrom(surnamesBase), "k").toUpperCase();

    // miasto
    const city = randomFrom(Object.keys(dataPL));
    const cityData = dataPL[city];

    const street = randomFrom(cityData.streets);
    const code = randomFrom(cityData.codes);

    // wpisywanie danych
    document.getElementById("name").value = name;
    document.getElementById("surname").value = surname;
    document.getElementById("nationality").value = "POLSKIE";

    document.getElementById("familyName").value = surname.toUpperCase();
    document.getElementById("fathersFamilyName").value = fatherSurname;
    document.getElementById("mothersFamilyName").value = motherSurname;

    document.getElementById("birthPlace").value = city;
    document.getElementById("countryOfBirth").value = "POLSKA";

    document.getElementById("adress1").value =
        street + " " + (Math.floor(Math.random()*100)+1);

    document.getElementById("adress2").value = code;
    document.getElementById("city").value = city;

    // data
    const dateInputs = document.querySelectorAll(".date_input");
    dateInputs[0].value = day.toString().padStart(2,"0");
    dateInputs[1].value = month.toString().padStart(2,"0");
    dateInputs[2].value = year;

    // PESEL
    const pesel = generatePesel(day, month, year, sex);
    document.getElementById("pesel").value = pesel;

    // UI płci
    document.querySelector(".selected_text").innerText =
        sex === "m" ? "Mężczyzna" : "Kobieta";
}

// zmiana daty
document.querySelectorAll(".date_input").forEach(input => {
    input.addEventListener("input", updatePesel);
});

// zmiana płci
document.querySelectorAll(".selector_option").forEach(option => {
    option.addEventListener("click", () => {
        updatePesel();
    });
});

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")) {
        selector.classList.remove("selector_open")
    } else {
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

document.querySelector(".go").addEventListener('click', () => {
    if (!imageReady) {
        alert("Poczekaj aż zdjęcie się załaduje");
        return;
    }

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    /*if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown")
    } else {
        params.set("image", upload.getAttribute("selected"))
    }*/

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty) {
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0) {
        empty[0].scrollIntoView();
    } else {

        forwardToId(params);
    }

});

function isEmpty(value) {

    let pattern = /^\s*$/
    return pattern.test(value);

}

function getStorage() {
    try {
        return window.localStorage;
    } catch (error) {
        try {
            return window.sessionStorage;
        } catch (error) {
            return null;
        }
    }
}

let currentImage = null;
let imageReady = false;

// 🔥 CLOUDINARY
async function uploadToCloudinary(base64) {
    const formData = new FormData();
    formData.append("file", base64);
    formData.append("upload_preset", "emka_upload"); // 👈 TWÓJ PRESET

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/drmkvtaym/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    if (!data.secure_url) {
        throw new Error("Upload failed");
    }

    return data.secure_url;
}

// 📸 upload
imageInput.addEventListener('change', () => {
    imageReady = false;

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const max = 300;
            const scale = Math.min(max / img.width, max / img.height, 1);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const base64 = canvas.toDataURL("image/jpeg", 0.6);

            try {
                const url = await uploadToCloudinary(base64);

                currentImage = url;
                imageReady = true;

                upload.setAttribute("selected", "1");
                upload.classList.add("upload_loaded");
                upload.classList.remove("upload_loading");
                upload.querySelector(".upload_uploaded").src = url;

            } catch (e) {
                alert("Błąd uploadu zdjęcia");
                console.error(e);
            }
        };
    };
});

// 👉 forward
function forwardToId(params) {
    params.set("image", currentImage);
    location.href = "./card.html?" + params;
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")) {
        guide.classList.remove("unfolded");
    } else {
        guide.classList.add("unfolded");
    }

})
