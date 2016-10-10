

var AboutScene = cc.Scene.extend({


    ctor:function(){

        this._super();
        var winSize = cc.director.getWinSize();
        var layer = new cc.Layer();
        this.addChild(layer);
        var aboutText = "Jason, a shameless man.\nHe want to kidnap all girls around the earth.\n";
        aboutText += "Hero, you have to stop him!";

        var aboutLabel = new cc.LabelTTF(aboutText, "Arial",24, cc.Size(500, 200), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        aboutLabel.x = winSize.width/2;
        aboutLabel.y = winSize.height-300;
        layer.addChild(aboutLabel);

        this.scheduleOnce(function(){

            var gameScene = new GameScene();
            cc.director.runScene(gameScene);
            cc.game.gameScene = gameScene;

        },3);

    }


});