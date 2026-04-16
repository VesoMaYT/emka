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
