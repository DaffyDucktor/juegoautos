// ===== Pantalla de victoria =====
var Ganaste = {
    create: function(){
        musica.stop();
        juego.sound.play('ganaste', 0.8);

        juego.stage.backgroundColor = '#000';
        var titulo = juego.add.text(juego.width/2, 190, 'GANASTE', { font: 'bold 48px Arial', fill: '#0f0', stroke: '#fff', strokeThickness: 3 });
        titulo.anchor.setTo(0.5);
        juego.add.tween(titulo.scale).to({ x: 1.15, y: 1.15 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);

        juego.add.text(juego.width/2, 260, 'Completaste los 2 niveles', { font: '18px Arial', fill: '#fff' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 300, 'Puntos totales: ' + puntosTotales, { font: '22px Arial', fill: '#fff' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 335, 'Vidas restantes: ' + vidas, { font: '18px Arial', fill: '#fff' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 400, 'Click o ENTER para jugar de nuevo', { font: '15px Arial', fill: '#ffcc00' }).anchor.setTo(0.5);

        juego.input.onDown.addOnce(iniciarJuego);
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(iniciarJuego);
    }
};
