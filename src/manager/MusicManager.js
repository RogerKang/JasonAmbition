
var MusicManager = cc.Class.extend({

    starWar:null,
    ctor: function (gameScene) {
        //this._super();
    },
    playStarWar:function(){
        this.starWar = cc.audioEngine.playMusic("res/StarWar.mp3", true);
        cc.audioEngine.setMusicVolume(0.1);
    },
    playEffect:function(type){

        var effectName = "";

        switch(type){

            case "bullet" : effectName = "res/bullet.mp3";break;



        };

        cc.audioEngine.playEffect(effectName, false);


    }

});