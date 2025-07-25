// Configuration des instruments par type
const musicData = {
    Ahwach: ['Ganga', 'Nafir', 'Talount'],
    Chaabi: ['Darbouka', 'Kamanja', 'Taarija'],
    Gnawa: ['Guenbri', 'Qraqeb', 'Tbel'],
    Hwara: ['Big Talount', 'Naqos', 'Small Talount'],
    Rways: ['Naqos', 'Ribab', 'Tbel']
};

const musicImages = {
    Ahwach: "images/ahwach.jpeg",
    Chaabi: "images/telecharger_54.jpeg",
    Gnawa: "images/gnawa.jpeg",
    Hwara: "images/telecharger_55.jpeg",
    Rways: "images/telecharger_57.jpeg"
};

// Fonction pour obtenir les paramètres de l'URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let currentAudios = {};
let selectedMusicType = "";
let selectedInstrument = "";

// Autre configuration pour référence
/*
const instrumentData = {
    Ahwach: ['Ganga', 'Nafir', 'Talount'],
    Chaabi: ['Darbouka', 'Kamanja', 'Taarija'],
    Gnawa: ['Guenbri', 'Qraqeb', 'Tbel'],
    Hwara: ['Big Talount', 'Naqos', 'Small Talount'],
    Rways: ['Naqos', 'Ribab', 'Tbel']
};
*/

// Fonction pour obtenir les paramètres de l'URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Variables globales
// Fonction pour mettre à jour les instruments
function updateInstruments(type) {
    console.log('Mise à jour des instruments pour le type:', type);
    // Mettre à jour le titre
    const musicTitle = document.getElementById('musicTitle');
    if (musicTitle) {
        musicTitle.innerText = type;
    } else {
        console.error('Élément musicTitle non trouvé');
    }
    
    // Mettre à jour les instruments
    const instrumentSelect = document.getElementById('instrumentType');
    if (instrumentSelect) {
        instrumentSelect.innerHTML = '<option value="">-- Choisir un instrument --</option>';
        
        // Ajouter les instruments du type sélectionné
        if (musicData[type]) {
            musicData[type].forEach(instrument => {
                const option = document.createElement('option');
                option.value = instrument;
                option.textContent = instrument;
                instrumentSelect.appendChild(option);
            });
        }
    } else {
        console.error('Élément instrumentType non trouvé');
    }
    
    // Afficher le sélecteur d'instruments
    const instrumentSelector = document.getElementById('instrumentSelector');
    if (instrumentSelector) {
        instrumentSelector.style.display = 'block';
    } else {
        console.error('Élément instrumentSelector non trouvé');
    }
    
    // Cacher les instructions et les images
    const instructions = document.getElementById('instructions');
    const instrumentImages = document.getElementById('instrumentImages');
    if (instructions) {
        instructions.style.display = 'none';
    } else {
        console.error('Élément instructions non trouvé');
    }
    if (instrumentImages) {
        instrumentImages.style.display = 'none';
    } else {
        console.error('Élément instrumentImages non trouvé');
    }
    
    // Réinitialiser les audios
    currentAudios = {};
    selectedInstrument = "";
}

// Écouter les changements de type de musique
const musicTypeElement = document.getElementById('musicType');
if (musicTypeElement) {
    console.log('Sélection de type de musique trouvée');
    musicTypeElement.addEventListener('change', (e) => {
        console.log('Changement de type détecté:', e.target.value);
        const selectedType = e.target.value;
        selectedMusicType = selectedType;
        updateInstruments(selectedType);
    });
} else {
    console.error('Élément de sélection de type de musique non trouvé');
}

// Charger le type de musique depuis l'URL
window.onload = function() {
    console.log('Page chargée');
    const typeFromUrl = getQueryParam("type");
    if (typeFromUrl) {
        console.log('Type de musique dans l\'URL:', typeFromUrl);
        const musicType = document.getElementById('musicType');
        if (musicType) {
            musicType.value = typeFromUrl;
            selectedMusicType = typeFromUrl;
            updateInstruments(typeFromUrl);
        } else {
            console.error('Élément musicType non trouvé');
        }
    }
}

// Fonction pour charger la liste des instruments depuis le dossier Media
async function loadInstruments(type) {
    try {
        console.log('Loading instruments for type:', type);
        
        // Au lieu de faire une requête fetch, utiliser les données statiques de musicData
        if (musicData[type]) {
            console.log('Found instruments:', musicData[type]);
            return musicData[type];
        } else {
            console.error('No instruments found for type:', type);
            return [];
        }
    } catch (error) {
        console.error('Error loading instruments:', error);
        return [];
    }
}

// Fonction pour charger les notes d'un instrument
async function loadNotes(instrumentPath) {
    try {
        // Simuler le chargement des notes (puisque nous ne pouvons pas lister les fichiers)
        // Retourner des noms de fichiers statiques pour les notes
        return ['note1.mp3', 'note2.mp3', 'note3.mp3'];
    } catch (error) {
        console.error('Error loading notes:', error);
        return [];
    }
}

// Écouter les changements de type de musique
const musicTypeElement2 = document.getElementById('musicType');
if (musicTypeElement2) {
    musicTypeElement2.addEventListener('change', async (e) => {
        const selectedType = e.target.value;
        selectedMusicType = selectedType;
        
        // Mettre à jour le titre
        document.getElementById('musicTitle').innerText = selectedType;
        
        // Afficher un message de chargement
        const instrumentSelect = document.getElementById('instrumentType');
        instrumentSelect.innerHTML = '<option value="">Chargement des instruments...</option>';
        
        try {
            // Charger les instruments
            const instruments = await loadInstruments(selectedType);
            
            // Effacer les options existantes
            instrumentSelect.innerHTML = '<option value="">-- Choisir un instrument --</option>';
            
            // Ajouter les nouveaux instruments
            instruments.forEach(instrument => {
                const option = document.createElement('option');
                option.value = instrument;
                option.textContent = instrument;
                instrumentSelect.appendChild(option);
            });
            
            // Afficher le sélecteur d'instruments
            document.getElementById('instrumentSelector').style.display = 'block';
            
            // Cacher les instructions et les images
            document.getElementById('instructions').style.display = 'none';
            document.getElementById('instrumentImages').style.display = 'none';
            
            // Réinitialiser les audios
            currentAudios = {};
            selectedInstrument = "";
            
            if (instruments.length === 0) {
                alert('Aucun instrument trouvé pour ce type de musique.');
            }
        } catch (error) {
            console.error('Erreur lors du chargement des instruments:', error);
            alert('Erreur lors du chargement des instruments. Vérifiez votre connexion internet.');
            instrumentSelect.innerHTML = '<option value="">Erreur lors du chargement</option>';
        }
    });
}

// Écouter les changements d'instrument
const instrumentSelect = document.getElementById('instrumentType');
if (instrumentSelect) {
    instrumentSelect.addEventListener('change', async (e) => {
        const selectedInstrument = e.target.value;
        if (!selectedInstrument) return;

        // Charger les notes
        // Utiliser le chemin complet vers le dossier Media sur le bureau
        const instrumentPath = `../Media/${selectedMusicType}/${selectedInstrument}/`;
        const notes = await loadNotes(instrumentPath);
        
        // Créer les audios pour chaque note
        currentAudios[selectedInstrument] = notes.map(note => new Audio(`${instrumentPath}${note}`));
        
        // Afficher les instructions
        document.getElementById('instructions').style.display = 'block';
        
        // Mettre à jour les images des instruments
        const instrumentImages = document.getElementById('instrumentImages');
        instrumentImages.style.display = 'flex';
        
        // Mettre à jour les prévisualisations
        const preview1 = document.getElementById('preview1');
        const preview2 = document.getElementById('preview2');
        const preview3 = document.getElementById('preview3');
        
        preview1.innerHTML = `
            <img src="../Media/${selectedMusicType}/${selectedInstrument}/note1.jpg" 
                 alt="Note 1" style="width:80px; height:auto;">
            <p>Note 1</p>
        `;
        
        preview2.innerHTML = `
            <img src="../Media/${selectedMusicType}/${selectedInstrument}/note2.jpg" 
                 alt="Note 2" style="width:80px; height:auto;">
            <p>Note 2</p>
        `;
        
        preview3.innerHTML = `
            <img src="../Media/${selectedMusicType}/${selectedInstrument}/note3.jpg" 
                 alt="Note 3" style="width:80px; height:auto;">
            <p>Note 3</p>
        `;
    });
}

// Écouter les touches du clavier
document.addEventListener('keydown', function(event) {
    if (selectedInstrument && ["1", "2", "3"].includes(event.key)) {
        const noteIndex = parseInt(event.key) - 1;
        const audio = currentAudios[selectedInstrument][noteIndex];
        
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
});

// Charger le type de musique depuis l'URL
window.onload = async function() {
    // Obtenir le paramètre music de l'URL (pour les liens directs)
    const musicFromUrl = getQueryParam("music");
    if (musicFromUrl) {
        const musicType = document.getElementById('musicType');
        if (musicType) {
            // Convertir première lettre en majuscule pour correspondre aux valeurs du select
            const formattedType = musicFromUrl.charAt(0).toUpperCase() + musicFromUrl.slice(1);
            musicType.value = formattedType;
            selectedMusicType = formattedType;
            
            // Déclencher l'événement change pour mettre à jour l'interface
            const event = new Event('change');
            musicType.dispatchEvent(event);
            
            // Mettre à jour l'interface
            updateUIForMusicType(formattedType);
        }
    }
}

document.getElementById('musicType').addEventListener('change', function () {
    const type = this.value;
    updateUIForMusicType(type);
});

function updateUIForMusicType(type) {
    selectedMusicType = type;
    document.getElementById("musicTitle").innerText = type;
    
    // Mise à jour de l'image
    const imageElement = document.getElementById("musicTypeImage");
    if (type && musicImages[type]) {
        imageElement.src = musicImages[type];
        imageElement.style.display = "block";
    } else {
        imageElement.style.display = "none";
    }

    // Afficher la grille d'instruments
    const instrumentsGrid = document.getElementById('instrumentsGrid');
    const instrumentsContainer = instrumentsGrid.querySelector('.instruments-container');
    instrumentsContainer.innerHTML = ''; // Nettoyer les instruments existants

    if (type && musicData[type]) {
        instrumentsGrid.style.display = 'block';
        
        musicData[type].forEach(instrument => {
            const card = document.createElement('div');
            card.className = 'instrument-card';
            card.innerHTML = `
                <img src="../Media/${type}/${instrument}/icon.jpg" alt="${instrument}">
                <h3>${instrument}</h3>
            `;
            
            card.addEventListener('click', () => {
                // Désélectionner tous les autres instruments
                document.querySelectorAll('.instrument-card').forEach(c => {
                    c.classList.remove('selected');
                });
                
                // Sélectionner cet instrument
                card.classList.add('selected');
                selectedInstrument = instrument;
                
                // Charger les sons
                currentAudios[selectedInstrument] = [
                    new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note1.mp3`),
                    new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note2.mp3`),
                    new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note3.mp3`)
                ];
                
                // Afficher les instructions
                document.getElementById('instructions').style.display = 'block';
            });
            
            instrumentsContainer.appendChild(card);
        });
    } else {
        instrumentsGrid.style.display = 'none';
    }
}

// document.getElementById('instrumentType').addEventListener('change', function () {
//     selectedInstrument = this.value;
//     const instructions = document.getElementById('instructions');
//     instructions.style.display = "none";
//     currentAudios = {};

//     if (selectedInstrument) {
//         // Utiliser le chemin correct vers les fichiers audio (../Media/ au lieu de assets/)
//         currentAudios[selectedInstrument] = [
//             new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note1.mp3`),
//             new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note2.mp3`),
//             new Audio(`../Media/${selectedMusicType}/${selectedInstrument}/note3.mp3`)
//         ];
//         instructions.style.display = "block";
//         console.log('Fichiers audio chargés pour', selectedInstrument, ':', currentAudios[selectedInstrument]);
//     }
// });

document.addEventListener('keydown', function (event) {
    if (selectedInstrument && ["1", "2", "3"].includes(event.key)) {
        const noteIndex = parseInt(event.key) - 1;
        const audio = currentAudios[selectedInstrument][noteIndex];
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
});



