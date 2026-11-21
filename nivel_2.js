// ===== NIVEL 2 (mas dificil) =====
// Reutiliza toda la logica del Nivel 1 (Juego) y solo cambia la configuracion:
// enemigos diferentes (carro verde), mas rapidos y que aparecen con mas frecuencia.
var Nivel_2 = Object.assign({}, Juego, {
    nivel: 2,
    spriteEnemigo: 'carroMalo1',   // obstaculo diferente
    siguienteEstado: 'Ganaste',    // al completar este nivel se gana el juego
    velocidadEnemigos: 380,        // antes 200
    velocidadGasolina: 300,        // antes 200
    tiempoEnemigos: 800,           // antes 1500 ms
    tiempoGasolina: 2200,          // antes 2000 ms
    velocidadFondo: 6,             // antes 3
    velocidadCarro: 7              // antes 5
});
