// ===== Variables compartidas por todos los estados =====
var VIDAS_INICIALES = 3;
var PUNTOS_PARA_PASAR = 3;   // puntos necesarios para pasar de nivel

var vidas = VIDAS_INICIALES;
var puntos = 0;              // puntos del nivel actual
var puntosTotales = 0;       // puntos de toda la partida

var musica;                  // musica de fondo (se mantiene entre estados)
var sonidoChoque;
var sonidoBarril;

// Reinicia los valores y arranca el nivel 1
function iniciarJuego() {
    vidas = VIDAS_INICIALES;
    puntos = 0;
    puntosTotales = 0;
    if (!musica.isPlaying) {
        musica.play();
    }
    juego.state.start('Juego');
}

// Marcador (score) que usan los niveles
function crearMarcador(nivel) {
    var estilo = { font: 'bold 18px Arial', fill: '#fff', stroke: '#000', strokeThickness: 4 };
    var marcador = {
        puntos: juego.add.text(10, 8, '', estilo),
        vidas: juego.add.text(juego.width - 10, 8, '', estilo),
        nivel: juego.add.text(juego.width / 2, 8, 'Nivel ' + nivel, estilo)
    };
    marcador.vidas.anchor.setTo(1, 0);
    marcador.nivel.anchor.setTo(0.5, 0);
    actualizarMarcador(marcador);
    return marcador;
}

function actualizarMarcador(marcador) {
    marcador.puntos.text = 'Puntos: ' + puntos + '/' + PUNTOS_PARA_PASAR;
    marcador.vidas.text = 'Vidas: ' + vidas;
}

// ===== Estado Portada (GamePlay) =====
var Portada = {

    preload: function(){
        // Se cargan todos los recursos una sola vez
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('carroMalo1', 'img/carroMalo1.png');
        juego.load.image('gasolina', 'img/gas.png');

        juego.load.audio('fondo', 'sonidos/fondo.wav');
        juego.load.audio('choque', 'sonidos/choque.wav');
        juego.load.audio('barril', 'sonidos/barril.wav');
        juego.load.audio('ganaste', 'sonidos/ganaste.wav');
        juego.load.audio('perdiste', 'sonidos/perdiste.wav');

        juego.forceSingleUpdate = true;
    },

    create: function(){
        if (!musica) {
            musica = juego.add.audio('fondo', 0.5, true);
            sonidoChoque = juego.add.audio('choque', 0.8);
            sonidoBarril = juego.add.audio('barril', 0.8);
        }

        this.fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');

        var sombra = juego.add.graphics(0, 0);
        sombra.beginFill(0x000000, 0.6);
        sombra.drawRect(15, 110, 260, 330);
        sombra.endFill();

        juego.add.text(juego.width / 2, 150, 'CARRERA', { font: 'bold 40px Arial', fill: '#ffcc00', stroke: '#000', strokeThickness: 6 }).anchor.setTo(0.5);
        juego.add.text(juego.width / 2, 195, 'GamePlay', { font: '22px Arial', fill: '#fff' }).anchor.setTo(0.5);
        juego.add.text(juego.width / 2, 245, 'Lucas Visurraga', { font: 'bold 26px Arial', fill: '#00e5ff', stroke: '#000', strokeThickness: 4 }).anchor.setTo(0.5);

        juego.add.text(juego.width / 2, 310,
            'Flechas: mover el carro\n' +
            'Barril: +1 punto\n' +
            'Enemigo: -1 vida\n' +
            PUNTOS_PARA_PASAR + ' puntos = siguiente nivel',
            { font: '15px Arial', fill: '#fff', align: 'center' }).anchor.setTo(0.5);

        var textoInicio = juego.add.text(juego.width / 2, 400, 'Click o ENTER para jugar', { font: 'bold 17px Arial', fill: '#ffcc00' });
        textoInicio.anchor.setTo(0.5);
        juego.add.tween(textoInicio).to({ alpha: 0.2 }, 600, Phaser.Easing.Linear.None, true, 0, -1, true);

        juego.add.sprite(juego.width / 2, 490, 'carro').anchor.setTo(0.5);

        // El audio solo puede empezar tras una accion del usuario
        juego.input.onDown.addOnce(iniciarJuego);
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(iniciarJuego);
    },

    update: function(){
        this.fondo.tilePosition.y += 1;
    }
};
