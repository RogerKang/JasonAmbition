

var TestScene =  cc.Scene.extend({


    allowExplode:true,
    ctor:function(){

        this._super();

        var winSize = cc.director.getWinSize();
        this.winSize = winSize;
        var layer = new cc.Layer();
        layer.bullets=[];
        this.addChild(layer);
        this.layer = layer;

        this.enemies = [];

        var bgImage1 = new cc.Sprite("res/game_bg1.jpg");
        bgImage1.x=winSize.width/2;
        bgImage1.y = winSize.height/2;
        layer.addChild(bgImage1);

        var bgImage2 = new cc.Sprite("res/game_bg1.jpg");
        bgImage2.x=winSize.width/2;
        bgImage2.y = winSize.height/2+winSize.height;
        layer.addChild(bgImage2);

        this.bgImage1 = bgImage1;
        this.bgImage2 = bgImage2;


        var size = cc.winSize;
        var man = new cc.Sprite();
        var animation = new cc.Animation();
        for (var i = 0; i < animation_pngs.length; i++) {
            animation.addSpriteFrameWithFile(animation_pngs[i]);
        }
        animation.setDelayPerUnit(1/14);
        var action = cc.animate(animation);
        action.repeatForever();
        man.runAction(action);
        this.addChild(man);
        man.x = size.width/2;
        man.y = size.height/2;
        man.setOpacity(220);
        man.scale = 2;


        //this.scheduleUpdate();







    },
    update:function(){

        if(this.allowExplode == true) {
            var nodeLibrary = new cc.NodeLoaderLibrary();
            nodeLibrary.registerDefaultCCNodeLoaders();
            var reader = new cc.BuilderReader(new cc.BuilderReader(nodeLibrary, null, null, null));
            var animationManager = new cc.BuilderAnimationManager();
            var ccbNode = reader.readNodeGraphFromFile("res/particle/wsparticle_hit_03.ccbi", null, null, animationManager);
            //console.log(ccbNode);
            ccbNode.x = cc.game.winSize.width / 2;
            ccbNode.y = cc.game.winSize.height / 2;
            this.addChild(ccbNode);
            this.allowExplode = false;
            trace(animationManager.getAutoPlaySequenceId());
            trace(animationManager.getSequences());
            animationManager.setRootNode(ccbNode);
            this.scheduleOnce(function(){

                //this.allowExplode = true;
                //delete ccbNode;
                this.removeChild(ccbNode);

                //animationManager.runAnimations(0,0);
                //ccbNode._animationManagers.runAnimations(0,0);
                ccbNode.x = Math.random()*cc.game.winSize.width;
                ccbNode.y = Math.random()*cc.game.winSize.height;


                this.addChild(ccbNode);
                reader.getAnimationManager().runAnimations(0,0);


            }.bind(this),10);
        }



    }

});