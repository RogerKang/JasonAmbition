
var Plane = cc.Sprite.extend({

    image:null,
    bullet:[],
    status:null,
    blood:5000,
    layer:null,
    gameScene:null,
    shotInterval:200,
    allowShot:true,
    allowMissile:true,
    allowUltra:true,
    hitEffect:null,
    addedEffects:[],
    laserHit:true,

    ctor:function(gameScene, layer){

        this._super("res/main_plane.png");
        this.gameScene = gameScene;
        this.layer = layer;
        this.addedEffects = [];
        this.allowShot = true;
        this.allowMissile = true;
        this.allowUltra = true;
        this.laserHit = true;


    },
    _shot:function() {

        var addedEffect = [];

        if(this.addedEffects!=null && this.addedEffects.length>0){

            for(var k=0;k<this.addedEffects.length;k++){

                addedEffect.push(this.addedEffects[k].name);

            }


        }


        if (this.allowShot) {

            //cc.game.musicManager.playEffect("bullet");
            if (cc.pool.hasObject(DefaultBullet)) {

                cc.pool.getFromPool(DefaultBullet, "normal", this, this.layer, this.gameScene);
                //trace("reuse bullets");

            } else {

                new DefaultBullet("normal", this, this.layer, this.gameScene);
            }

            this.allowShot = false;
            this.scheduleOnce(function () {
                this.allowShot = true;

            }
                .bind(this), 0.2);

        }

        if(this.allowMissile) {
            if (addedEffect.indexOf("missile") != -1) {
                if (cc.pool.hasObject(MissileBullet)) {

                    cc.pool.getFromPool(MissileBullet, "normal", this, this.layer, this.gameScene);
                    trace("reuse bullets");

                } else {

                    new MissileBullet("normal", this, this.layer, this.gameScene);
                }


                this.allowMissile = false;
                this.scheduleOnce(function () {
                    this.allowMissile = true;

                }
                    .bind(this), 0.4);


            }



        }


        if(this.allowUltra) {
            if (addedEffect.indexOf("ultra") != -1) {

                if (cc.pool.hasObject(UltraBullet)) {

                    cc.pool.getFromPool(UltraBullet, "ultra", this, this.layer, this.gameScene);
                    trace("reuse bullets");

                } else {

                    new UltraBullet("ultra", this, this.layer, this.gameScene);
                }


                this.allowUltra = false;
                this.scheduleOnce(function () {
                    this.allowUltra = true;

                }
                    .bind(this), 0.5);

            }

        }





    },
    renderHit:function(scene){


        var sprite = new cc.Sprite("plane.png");
        var sprite2 = new cc.Sprite("bullet.png");

        //创建画布
        var rend = new cc.RenderTexture( starManager.winSize.width, starManager.winSize.height );

        sprite.setPosition(400,starManager.winSize.height/4);
        sprite2.setPosition(200,200);
        //设置精灵的坐标为cocos坐标
        sprite.setPosition(cc.director.convertToGL(sprite.getPosition()));
        sprite2.setPosition(cc.director.convertToGL(sprite2.getPosition()));
        //画
        rend.begin();
        sprite.visit();
        sprite2.visit();
        rend.end();

        var spt=new cc.Sprite();
        spt.setSpriteFrame(rend.getSprite().getSpriteFrame());//这里必须重新创建精灵，否则会报错
        spt.setAnchorPoint(cc.p(0,0));
        spt.setOpacity(100);
        this.addChild(spt);


    },
    showHitEffect:function(harm){

        var addedEffect = [];

        if(this.addedEffects!=null && this.addedEffects.length>0){

            for(var k=0;k<this.addedEffects.length;k++){

                addedEffect.push(this.addedEffects[k].name);

            }


        }

        if(addedEffect.indexOf("shield")==-1)
            this.blood -= harm;

        //this.itemBatchLayer = new cc.SpriteBatchNode("res/particle/texture.png");
        //this.gameScene.addChild(this.itemBatchLayer);

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
        //console.log(reader);

        //var ccbNode = reader.createSceneWithNodeGraphFromFile("res/particle/wsparticle_hit_01.ccbi", null, null, new cc.BuilderAnimationManager());
        //var ccbNode = reader.createSceneWithNodeGraphFromFile("res/particle/wsparticle_super01.ccbi", null, null, new cc.BuilderAnimationManager());


        //var ccbNode = reader.readNodeGraphFromFile("res/particle/wsparticle_hit_01.ccbi", null, null, new cc.BuilderAnimationManager());
        ////console.log(ccbNode);
        //ccbNode.x = this.x+(40-Math.random()*80);
        //ccbNode.y = this.y+(20-Math.random()*40);
        //this.gameScene.addChild(ccbNode);
        //this.scheduleOnce(function(){
        //
        //    this.gameScene.removeChild(ccbNode);
        //
        //}.bind(this), 2);
        cc.game.particleManager.showParticle("hit", this.gameScene, this, function(x, y){

            return {
                x:x+(40-Math.random()*80),
                y:y+(20-Math.random()*40)
            };

        }, false);



    },
    update:function(){

        if(this.hitEffect!=null) {
            this.hitEffect.x = this.x;
            this.hitEffect.y = this.y;
        }

        if(this.addedEffects!=null && this.addedEffects.length>0){


            for(var j=0;j<this.addedEffects.length;j++){

                this.addedEffects[j].effect.x = this.x;
                this.addedEffects[j].effect.y = this.y;

            }


        }



    },
    removeAddedEffect:function(timeStamp){


        if(this.addedEffects==null || this.addedEffects.length==0)
            return true;

        for(var i=0;i<this.addedEffects.length;i++){

            if(this.addedEffects[i].timeStamp == timeStamp){

                this.addedEffects.splice(i, 1);
                i--;

            }


        }


    }



});