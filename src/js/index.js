import Phaser from 'phaser';

import Menu from './scenes/Menu';
import Play from './scenes/Play';

const game = new Phaser.Game({
    width: 540,
    height: 960,
    type: Phaser.AUTO,
    parent: 'phaser-game'
});

game.scene.add('menu', Menu);
game.scene.add('play', Play);

game.scene.start('play');