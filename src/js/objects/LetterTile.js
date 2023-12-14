import Phaser from 'phaser';

const LETTER_FREQUENCY = "eeeeeeeeeeeeetttttttttaaaaaaaaooooooooiiiiiiinnnnnnnsssssshhhhhhrrrrrrddddllllcccuuummwwffggyyppbbvkjxqz";

export default class LetterTile extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);

        this.tile = this.scene.add.graphics();
        this.tile.fillStyle(0x404040, 1.0);
        this.tile.fillRoundedRect(0, 0, 75, 75, 15);
        this.add(this.tile);
        
        this.letter = this.scene.add.text(37.5, 0, this.pickLetter(), { font: ' 85px "Courier New", monospace' });
        this.letter.setOrigin(0.5, 0);
        this.add(this.letter);
    }

    pickLetter() {

        return LETTER_FREQUENCY.charAt(Math.floor(LETTER_FREQUENCY.length * Math.random())).toUpperCase();
    }
}