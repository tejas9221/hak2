let voiceData = "";
let chart = null;

// 🎤 Voice Input
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        voiceData = event.results[0][0].transcript;
        document.getElementById("voiceText").innerText = "Voice: " + voiceData;
    };

    recognition.start();
}

// 🔍 Predict
async function predict() {

    let file = document.getElementById("imageInput").files[0];
    let symptoms = document.getElementById("symptoms").value;

    if (!file) {
        alert("Please upload an image");
        return;
    }

    document.getElementById("loader").classList.remove("hidden");

    let formData = new FormData();
    formData.append("image", file);
    formData.append("symptoms", symptoms);
    formData.append("voice", voiceData);

    try {
        let res = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData
        });

        let data = await res.json();

        document.getElementById("loader").classList.add("hidden");

        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById("result").innerText =
            "Prediction: " + data.prediction;

        document.getElementById("tip").innerText =
            "Tip: " + data.tip;

        drawChart(data.labels, data.confidence);

    } catch (err) {
        alert("Server error");
    }
}

// 📊 Graph
function drawChart(labels, values) {

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Confidence",
                data: values
            }]
        }
    });
}

// ♻ Reset
function resetAll() {
    document.getElementById("imageInput").value = "";
    document.getElementById("symptoms").value = "";
    document.getElementById("voiceText").innerText = "";
    document.getElementById("result").innerText = "";
    document.getElementById("tip").innerText = "";
    voiceData = "";

    if (chart) chart.destroy();
}
