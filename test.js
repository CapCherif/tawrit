const { exec } = require('child_process');

// Commande pour exécuter le script Python
const command = 'python script.py';

const axios = require('axios');

async function geocodeAddress(address) {
  try {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.length > 0) {
      const result = data[0];
      const coordinates = {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon)
      };
      console.log('Coordonnées :', coordinates);
    } else {
      console.log('Impossible de géocoder l\'adresse');
    }
  } catch (error) {
    console.error('Erreur lors de la requête de géocodage', error);
  }
}

// Exemple d'utilisation de la fonction de géocodage
geocodeAddress('Boussouf, constantine, algeria');




function Function(){
// Exécution de la commande
exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur d'exécution du script Python : ${error}`);
      return;
    }
  
    // Affichage de la sortie standard
    console.log('Sortie standard :');
    console.log(stdout);
  
    // Affichage de la sortie d'erreur
    console.log('Sortie d\'erreur :');
    console.log(stderr);
  });
}

Function()
