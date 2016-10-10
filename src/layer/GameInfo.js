
var GameInfo = cc.Layer.extend({

    _lifeText:null,
    _distanceText:null,
    _scoreText:null,
    scene:null,
    layer:null,
    plane:null,

    ctor:function (scene, layer, plane) {
        this._super();

        this.scene = scene;
        this.layer = layer;
        this.plane = plane;
        var fnt = "res/fonts/font.fnt";
        var winSize = cc.director.getWinSize();

        var lifeLabel = new cc.LabelBMFont("Blood", fnt);
        lifeLabel.scale=0.85;
        this.addChild(lifeLabel);
        lifeLabel.x = 60;
        lifeLabel.y = winSize.height - 20;

        this._lifeText = new cc.LabelBMFont("100", fnt);
        this._lifeText.scale=0.85;
        this.addChild(this._lifeText);
        this._lifeText.x = 150;
        this._lifeText.y = winSize.height - 20;

        var scoreLabel = new cc.LabelBMFont("Score", fnt);
        scoreLabel.scale = 0.85;
        this.addChild(scoreLabel);
        scoreLabel.x = 340;
        scoreLabel.y = winSize.height - 20;

        this._scoreText = new cc.LabelBMFont("0", fnt);
        this._scoreText.scale = 0.85;
        this.addChild(this._scoreText);
        this._scoreText.x = 440;
        this._scoreText.y = winSize.height - 20;

        return true;
    },

    update:function() {

        var showBlood = "";
        var showScore = "";
        showBlood = this.plane.blood>0?this.plane.blood:0;
        showScore = this.scene.score>0?this.scene.score:0;
        this._lifeText.setString(showBlood.toString());
        this._scoreText.setString(showScore.toString());
    }

});