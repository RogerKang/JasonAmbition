
var MenuScene = cc.Scene.extend({

    ctor:function(){

        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);
        var winSize = cc.director.getWinSize();
        cc.game.winSize = winSize;
        var bgImage = new cc.Sprite("res/bg.png");
        bgImage.x=winSize.width/2;
        bgImage.y = winSize.height/2;
        layer.addChild(bgImage);


        var gameName = new cc.LabelTTF("Jason's Ambition", "Arial",58, cc.Size(500, 200), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);

        gameName.x = winSize.width/2;
        gameName.y = winSize.height+100;
        var gameNameAction = cc.moveTo(3, cc.p(winSize.width/2, winSize.height-200));

        gameName.runAction(gameNameAction);
        layer.addChild(gameName);

        this.scheduleOnce(function(){

            this.showMenu();

        }.bind(this),3);

        cc.game.musicManager.playStarWar();


    },
    showMenu:function(){

        //console.log(typeof  this.startGame == 'function');

        var startGameButton = new cc.MenuItemImage("res/startgame2.png", "res/startgame2.png", this.startGame, this);
        var menu = new cc.Menu(startGameButton);
        this.addChild(menu);


    },
    startGame: function(){

        trace('Game start..');

        cc.director.runScene(new AboutScene());



    }

});