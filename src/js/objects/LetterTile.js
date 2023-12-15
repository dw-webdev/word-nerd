import Phaser from 'phaser';

const LETTER_FREQUENCY = "eeeeeeeeeeeeetttttttttaaaaaaaaooooooooiiiiiiinnnnnnnsssssshhhhhhrrrrrrddddllllcccuuummwwffggyyppbbvkjxqz";

export default class LetterTile extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);

        this.tile = this.scene.add.sprite(0, 0, 'letter-tile');
        this.tile.setOrigin(0, 0);
        this.add(this.tile);

        this.timer = this.scene.add.graphics();
        this.timer.x = 42.5;
        this.timer.y = 42.5;
        this.timer.angle = -90;
        this.add(this.timer);
        
        this.letter = this.scene.add.text(42.5, 5, "", { font: ' 85px "Courier New", monospace' });
        this.letter.setOrigin(0.5, 0);
        this.add(this.letter);

        this.refresh();
    }

    refresh() {

        this.tile.setFrame(Math.floor(Math.random() * 2));

        this.timer.clear();
        this.timer.fillStyle(0xffffff, 0.2);
        this.timer.beginPath();
        this.timer.arc(0, 0, 32.5, 0, Math.PI * 2 * Math.random());
        this.timer.lineTo(0, 0);
        this.timer.fillPath();

        this.letter.text = this.pickLetter();
    }

    pickLetter() {

        return LETTER_FREQUENCY.charAt(Math.floor(LETTER_FREQUENCY.length * Math.random())).toUpperCase();
    }
}