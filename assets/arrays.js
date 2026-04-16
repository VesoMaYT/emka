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