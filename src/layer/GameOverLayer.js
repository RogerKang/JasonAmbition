

var GameOverLayer = cc.Layer.extend({

    _distanceText:null,
    _scoreText:null,
    _gameScene:null,

    ctor:function(gameScene){
        this._super();
        this._gameScene = gameScene;
        cc.director.pause();

        var winSize = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
        this.addChild(bg);

        var fnt = "res/fonts/font.fnt";
        var title = new cc.LabelBMFont("Game Over!", fnt, 400);
        title.scale = 1.7;
        this.addChild(title);
        title.setColor(cc.color(243,231,95));
        title.x = winSize.width/2;
        title.y = winSize.height - 150;


        this._scoreText = new cc.LabelBMFont("SCORE: "+gameScene.score, fnt);
        this.addChild(this._scoreText);
        this._scoreText.x = winSize.width/2;
        this._scoreText.y = winSize.height - 270;


        var replayBtn = new cc.MenuItemImage("res/gameOver_playAgainButton.png", "res/gameOver_playAgainButton.png", this._replay.bind(this));
        var mainBtn = new cc.MenuItemImage("res/gameOver_mainButton.png", "res/gameOver_mainButton.png", this._return.bind(this));
        var menu = new cc.Menu(replayBtn, mainBtn);
        menu.alignItemsVertically();
        this.addChild(menu);
        menu.y = winSize.height/2 - 100;
        gameScene.addChild(this);
    },

    _replay:function(){

        this._gameScene.unscheduleUpdate();
        cc.game.musicManager = new MusicManager();
        cc.game.bulletManager = new BulletManager();
        cc.game.enemyManager = new EnemyManager();
        cc.game.itemManager = new ItemManager();
        cc.game.particleManager = new ParticleManager();
        cc.game.stageManager = new StageManager(defaultStage);
        var gameScene = new GameScene();
        cc.director.runScene(gameScene);
        cc.game.gameScene = gameScene;
        cc.director.resume();


    },


    _return:function(){

        this._gameScene.unscheduleUpdate();
        cc.game.musicManager = new MusicManager();
        cc.game.bulletManager = new BulletManager();
        cc.game.enemyManager = new EnemyManager();
        cc.game.itemManager = new ItemManager();
        cc.game.particleManager = new ParticleManager();
        cc.game.stageManager = new StageManager(defaultStage);
        cc.director.runScene(new MenuScene());

        cc.director.resume();


    }

});