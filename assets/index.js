let currentImage = null;
imageReady = false;

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

imageInput.addEventListener('change', async () => {
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

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const maxDimension = 300; // maximum width or height for resized image
            const scale = Math.min(maxDimension / img.width, maxDimension / img.height, 1);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const base64 = canvas.toDataURL("image/jpeg", 0.6);

            currentImage = base64;
            imageReady = true;

            upload.setAttribute("selected", "1");
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            upload.querySelector(".upload_uploaded").src = base64;
        };
    };
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

function openImageDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) {
            return resolve(null);
        }
        const request = indexedDB.open("moby_app_db", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("moby_store")) {
                db.createObjectStore("moby_store");
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
}

async function saveImageToDB(image) {
    const db = await openImageDB();
    if (!db || !image) return;
    return new Promise((resolve) => {
        const tx = db.transaction("moby_store", "readwrite");
        const store = tx.objectStore("moby_store");
        const request = store.put(image, "moby_id_image");
        request.onsuccess = () => {
            resolve(true);
        };
        request.onerror = () => {
            resolve(false);
        };
        tx.oncomplete = () => db.close();
        tx.onerror = () => db.close();
    });
}

function setCookieData(data) {
    try {
        const cookieData = Object.assign({}, data);
        delete cookieData.image;
        const value = encodeURIComponent(JSON.stringify(cookieData));
        const maxAge = 60 * 60 * 24 * 365; // 1 year
        document.cookie = `moby_id_data=${value}; max-age=${maxAge}; path=/; samesite=lax`;
    } catch (error) {
        // ignore cookie permissions errors
    }
}

function saveImageToStorage(image) {
    const storage = getStorage();
    if (!storage || !image) return;
    try {
        storage.setItem("moby_id_image", image);
    } catch (error) {
        // ignore storage errors
    }
}

function saveFormData(params) {
    const storage = getStorage();
    const data = Object.fromEntries(params.entries());
    if (storage) {
        try {
            storage.setItem("moby_id_data", JSON.stringify(data));
        } catch (error) {
            // storage may be full or blocked; ignore silently
        }
    }
    if (currentImage) {
        saveImageToDB(currentImage); // Prioritize IndexedDB for image
        saveImageToStorage(currentImage); // Also try localStorage
    }
    setCookieData(data);
}

function forwardToId(params) {
    saveFormData(params);
    location.href = "./card.html";
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")) {
        guide.classList.remove("unfolded");
    } else {
        guide.classList.add("unfolded");
    }

})
