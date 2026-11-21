// ===== Pantalla de derrota =====
var Terminado = {
    create: function(){
        musica.stop();
        juego.sound.play('perdiste', 0.8);

        juego.stage.backgroundColor = '#000';
        juego.add.text(juego.width/2, 170, 'GAME OVER', { font: 'bold 36px Arial', fill: '#f00' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 230, 'VUELVE A\nINTENTARLO', { font: 'bold 30px Arial', fill: '#ffcc00', align: 'center' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 310, 'Puntos totales: ' + puntosTotales, { font: '22px Arial', fill: '#fff' }).anchor.setTo(0.5);
        juego.add.text(juego.width/2, 370, 'Click o ENTER para reiniciar', { font: '16px Arial', fill: '#fff' }).anchor.setTo(0.5);

        juego.input.onDown.addOnce(iniciarJuego);
        juego.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(iniciarJuego);
    }
};
