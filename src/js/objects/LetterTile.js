import Phaser from 'phaser';

const LETTER_FREQUENCY = "eeeeeeeeeeeeetttttttttaaaaaaaaooooooooiiiiiiinnnnnnnsssssshhhhhhrrrrrrddddllllcccuuummwwffggyyppbbvkjxqz";

const TimerState = {
    NONE: 0,
    COUNT_UP: 1,
    COUNT_DOWN: 2
};

export default class LetterTile extends Phaser.GameObjects.Container {

    constructor(scene, x, y, index) {

        super(scene, x, y);

        this.tile = this.scene.add.sprite(0, 0, 'letter-tile');
        this.tile.setOrigin(0, 0);
        this.tile.setInteractive();
        this.tile.setData('index', index);
        this.tile.setData('selected', false);
        this.tile.on('pointerdown', this.onClick);
        this.add(this.tile);

        this.timerGraphic = this.scene.add.graphics();
        this.timerGraphic.x = 42.5;
        this.timerGraphic.y = 42.5;
        this.timerGraphic.angle = -90;
        this.add(this.timerGraphic);
        
        this.letter = this.scene.add.text(42.5, 5, "", { font: ' 85px "Courier New", monospace' });
        this.letter.setOrigin(0.5, 0);
        this.add(this.letter);

        this.timerCurrent = 0;
        this.timerLimit = 0;
        this.timerState = TimerState.NONE;

        this.refresh();
    }

    update(_, delta) {

        if(this.timerState === TimerState.COUNT_UP) {
            this.tile.setData('selected', false);
            this.timerCurrent += delta;
            if(this.timerCurrent >= this.timerLimit) {
                this.letter.text = this.pickLetter();
                this.timerCurrent = 0;
                this.timerLimit = 0;
                this.timerState = TimerState.NONE;
            }
        }
        if(this.timerState === TimerState.COUNT_DOWN) {
            this.timerCurrent -= delta;
            if(this.timerCurrent <= 0) {
                this.letter.text = "";
                this.timerCurrent = 0;
                this.timerLimit = 15000;
                this.timerState = TimerState.COUNT_UP;
            }
        }
        if(this.timerState === TimerState.NONE && Math.random() < 0.00005) {
            this.timerCurrent = 15000;
            this.timerLimit = 15000;
            this.timerState = TimerState.COUNT_DOWN;
        }

        const selected = this.tile.getData('selected');
        this.tile.setFrame(this.timerState === TimerState.COUNT_UP ? 4 : this.timerState === TimerState.COUNT_DOWN ? selected ? 3 : 2 : selected ? 1 : 0);

        this.timerGraphic.clear();
        if(this.timerCurrent > 0) {
            this.timerGraphic.lineStyle(10, this.timerState === TimerState.COUNT_DOWN ? 0xfff799 : 0xcccccc, 1);
            this.timerGraphic.beginPath();
            this.timerGraphic.arc(0, 0, 27.5, 0, Math.PI * 2 * (this.timerCurrent / this.timerLimit));
            this.timerGraphic.strokePath();
        }
    }

    refresh() {

        this.letter.text = this.pickLetter();
    }

    pickLetter() {

        return LETTER_FREQUENCY.charAt(Math.floor(LETTER_FREQUENCY.length * Math.random())).toUpperCase();
    }

    onClick(_) {

        console.log(this.getData('index'));
        this.setData('selected', !this.getData('selected'));
    }
}