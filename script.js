const apiKey = 'd7a8d944e376f6e9e6fd3af2bb39f6d9';
document.getElementById('cidade').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
    saberClima();
    }
});

async function saberClima() {
    let cidade = document.getElementById('cidade').value;

    if (cidade === '') {
        alert('Por favor, informe um nome de cidade válido.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt`);
        const data = await response.json();

        if (data.cod === 200) {
            let mensagem = mostrarClima(data);
            document.getElementById('resultado').innerText = mensagem;
        } else {
            document.getElementById('resultado').innerText = 'Cidade não encontrada.';
        }
    } catch (error) {
        document.getElementById('resultado').innerText = 'Erro ao buscar dados do clima.';
            console.error('Erro:', error);
    }
}

function mostrarClima(data) {
    let temperatura = data.main.temp;
    let condicao = data.weather[0].description;
    let cidade = data.name;
    let pais = data.sys.country;

    return `No momento atual em ${cidade}, ${pais}, a temperatura é ${temperatura}°C e a condição é ${condicao}.`;
}