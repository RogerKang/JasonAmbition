


var Gamma = Enemy.extend({

    image:"res/enemy/gamma.png",
    allowShot:true,
    blood:null,
    score:300,
    explosionHarm:500,

    ctor:function(scene, layer){

        this.allowShot = true;
        this.scene = scene;
        this.gameScene = this.scene;
        this.layer = layer;
        this._super(this.image);
        this.blood = 50;
        this.threshold = 50;
        this.appear();
        layer.removeChild(this);

        if(scene.enemies.indexOf(this)!=-1)
            scene.enemies.splice(scene.enemies.indexOf(this), 1);

        layer.addChild(this, 2);
        scene.enemies.push(this);

    },
    appear:function(){

        this.scale = 0.3;
        this.x = Math.round(Math.random()*cc.game.winSize.width);
        this.y = cc.game.winSize.height+100;
        this.move();

    },
    move:function(){

        var moveAction = cc.moveTo(3, cc.p(this.x,-400));
        this.runAction(moveAction);



    },
    attack:function(){

        //




    },
    showHitEffect:function(harm){

        this.blood -= harm;

        if(true) {
            var hitEffect = new cc.ParticleSystem("res/particle2/particle.plist");
            hitEffect.duration = 0.5;
            hitEffect.setAutoRemoveOnFinish(true);
            hitEffect.x = this.x;
            hitEffect.y = this.y;
            this.gameScene.addChild(hitEffect);
            this.hitEffect = hitEffect;
        }

        //cc.game.particleManager.showFire(this);

        //var nodeLibrary = new cc.NodeLoaderLibrary();
        //nodeLibrary.registerDefaultCCNodeLoaders();
        //var reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));
        //
        //var ccbNode = reader.readNodeGraphFromFile("res/particle/wsparticle_hit_01.ccbi", null, null, new cc.BuilderAnimationManager());
        //ccbNode.x = this.x+(40-Math.random()*80);
        //ccbNode.y = this.y+(0-Math.random()*40);
        //this.gameScene.addChild(ccbNode);
        //this.scheduleOnce(function(){
        //
        //    this.gameScene.removeChild(ccbNode);
        //
        //}.bind(this), 2);

        cc.game.particleManager.showParticle("hit", this.scene, this, function(x, y){

            return {
                x:x+(40-Math.random()*80),
                y:y+(0-Math.random()*80)
            };

        }, false);

    },
    explode:function(){

        //var nodeLibrary = new cc.NodeLoaderLibrary();
        //nodeLibrary.registerDefaultCCNodeLoaders();
        //var reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));
        //var ccbNode = reader.readNodeGraphFromFile("res/particle/wsparticle_hit_02.ccbi", null, null, new cc.BuilderAnimationManager());
        //ccbNode.x = this.x;
        //ccbNode.y = this.y;
        //this.gameScene.addChild(ccbNode);
        //this.scheduleOnce(function(){
        //
        //    this.gameScene.removeChild(ccbNode);
        //
        //}.bind(this), 2);

        cc.game.particleManager.showParticle("bomb", this.scene, this, function(x, y){

            return {
                x:x,
                y:y
            };

        }, false);


    }



});