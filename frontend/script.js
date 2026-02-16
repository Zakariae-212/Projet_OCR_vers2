const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultText = document.getElementById("resultText");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const languageDisplay = document.getElementById("languageDisplay");

let selectedFile = null;

// 📌 Afficher nom du fichier
fileInput.addEventListener("change", () => {
  selectedFile = fileInput.files[0];
  fileName.textContent = selectedFile ? selectedFile.name : "";
});

// 🌍 Mapping des langues (BONUS)
const langues = {
  en: "Anglais",
  fr: "Français",
  ar: "Arabe",
  es: "Espagnol",
  de: "Allemand"
};

// 🔍 Analyse
analyzeBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    alert("Veuillez sélectionner un fichier !");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("http://127.0.0.1:8000/ocr", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    afficherResultat(data);

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'analyse.");
  }
});

// 🧠 Affichage résultat
function afficherResultat(data) {
  // langue lisible
  const langueLisible = langues[data.language] || data.language;

  languageDisplay.textContent = "🌍 Langue détectée : " + langueLisible;

  resultText.value = data.text;
}
console.log(data);

// 📋 Copier
copyBtn.addEventListener("click", () => {
  resultText.select();
  document.execCommand("copy");
  alert("Texte copié !");
});

// 💾 Télécharger
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([resultText.value], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "texte.txt";
  link.click();
});