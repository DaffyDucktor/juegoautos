// ===== NIVEL 1 =====
var fondo;
var carro;
var cursores;
var enemigos;
var gasolinas;
var marcador;
var invulnerable = false;

var Juego = {

    // Configuracion del nivel 1 (mas lento)
    nivel: 1,
    spriteEnemigo: 'carroMalo',
    siguienteEstado: 'Nivel_2',
    velocidadEnemigos: 200,
    velocidadGasolina: 200,
    tiempoEnemigos: 1500,
    tiempoGasolina: 2000,
    velocidadFondo: 3,
    velocidadCarro: 5,

    create: function(){
        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');

        carro = juego.add.sprite(juego.width/2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro);

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
        enemigos.createMultiple(20, this.spriteEnemigo);
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);

        gasolinas = juego.add.group();
        gasolinas.enableBody = true;
        gasolinas.physicsBodyType = Phaser.Physics.ARCADE;
        gasolinas.createMultiple(20, 'gasolina');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);

        juego.time.events.loop(this.tiempoEnemigos, this.crearCarroMalo, this);
        juego.time.events.loop(this.tiempoGasolina, this.crearGasolina, this);

        cursores = juego.input.keyboard.createCursorKeys();

        puntos = 0;
        invulnerable = false;
        marcador = crearMarcador(this.nivel);
        this.mostrarMensaje('NIVEL ' + this.nivel);
    },

    update: function(){
        fondo.tilePosition.y += this.velocidadFondo;

        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += this.velocidadCarro;
        } else if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= this.velocidadCarro;
        }

        juego.physics.arcade.overlap(carro, enemigos, this.chocar, null, this);
        juego.physics.arcade.overlap(carro, gasolinas, this.recogerGasolina, null, this);
    },

    crearCarroMalo: function(){
        var posicion = Math.floor(Math.random()*3)+1;
        var enemigo = enemigos.getFirstDead();
        if (!enemigo) return;
        enemigo.reset(posicion*73, 0);
        enemigo.body.velocity.y = this.velocidadEnemigos;
    },

    crearGasolina: function(){
        var posicion = Math.floor(Math.random()*3)+1;
        var gasolina = gasolinas.getFirstDead();
        if (!gasolina) return;
        gasolina.reset(posicion*73, 0);
        gasolina.body.velocity.y = this.velocidadGasolina;
    },

    // Colision con un barril de gasolina: +1 punto
    recogerGasolina: function(jugador, gasolina){
        gasolina.kill();
        sonidoBarril.play();
        puntos++;
        puntosTotales++;
        actualizarMarcador(marcador);

        if (puntos >= PUNTOS_PARA_PASAR) {
            // Al acumular 3 puntos pasa al siguiente nivel (o gana)
            juego.state.start(this.siguienteEstado);
        }
    },

    // Colision con un enemigo: -1 vida
    chocar: function(jugador, enemigo){
        if (invulnerable) return;
        enemigo.kill();
        sonidoChoque.play();
        vidas--;
        actualizarMarcador(marcador);

        if (vidas <= 0) {
            juego.state.start('Terminado');
            return;
        }

        // Parpadeo e invulnerabilidad por 1 segundo
        invulnerable = true;
        juego.add.tween(carro).to({ alpha: 0.2 }, 100, Phaser.Easing.Linear.None, true, 0, 4, true);
        juego.time.events.add(1000, function(){
            invulnerable = false;
            carro.alpha = 1;
        });
    },

    mostrarMensaje: function(texto){
        var msg = juego.add.text(juego.width/2, juego.height/2, texto,
            { font: 'bold 40px Arial', fill: '#ffcc00', stroke: '#000', strokeThickness: 6 });
        msg.anchor.setTo(0.5);
        juego.add.tween(msg).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 500);
    }
};
