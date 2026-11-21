var juego = new Phaser.Game(290, 540, Phaser.AUTO, 'runner');

juego.state.add('Portada', Portada);
juego.state.add('Juego', Juego);       // Nivel 1
juego.state.add('Nivel_2', Nivel_2);   // Nivel 2
juego.state.add('Terminado', Terminado);
juego.state.add('Ganaste', Ganaste);
juego.state.start('Portada');
