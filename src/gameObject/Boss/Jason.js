

var Jason = Enemy.extend({

    image:"res/enemy/jason.png",
    allowShell:true,
    allowNavigate:true,
    showLaser:true,
    laserHurt:false,
    blood:null,
    score:100,
    explosionHarm:100,
    laser:null,

    ctor:function(scene, layer) {

        this.allowShell = true;
        this.allowNavigate = true;
        this.showLaser = false;
        this.laserHurt = false;
        this.scene = scene;
        this.gameScene = this.scene;
        this.layer = layer;
        this._super(this.image);
        this.blood = 10000;
        this.threshold = 100;
        this.appear();
        layer.removeChild(this);

        if (scene.enemies.indexOf(this) != -1)
            scene.enemies.splice(scene.enemies.indexOf(this), 1);

        layer.addChild(this, 7);
        scene.enemies.push(this);
        scene.boss = this;

        scene.scheduleOnce(function () {

            this.showLaser = true;

        }.bind(this), 10 + Math.random() * 10);
    }
    ,
    appear:function(){

        this.scale = 0.5;
        this.x = Math.round(Math.random()*cc.game.winSize.width);
        this.y = cc.game.winSize.height+100;
        this.move();

    },
    move:function(){

        var moveAction = cc.moveTo(6, cc.p(cc.game.winSize.width/2,cc.game.winSize.height-90));
        var moveRightFirst = cc.moveTo(4, cc.p(cc.game.winSize.width-150,cc.game.winSize.height-90));
        var moveLeft = cc.moveTo(8, cc.p(150,cc.game.winSize.height-90));
        var moveRight = cc.moveTo(8, cc.p(cc.game.winSize.width-150,cc.game.winSize.height-90));
        var repeatAction = cc.repeat(cc.sequence(moveLeft, moveRight), 1000);
        this.runAction(cc.sequence(moveAction, moveRightFirst, repeatAction));



    },
    attack:function(){


        if (this.allowShell) {

            if(cc.pool.hasObject(ShellBullet)){

                cc.pool.getFromPool(ShellBullet,"shell", this, this.layer, this.gameScene);
                //trace("reuse bullets");

            }else{

                new ShellBullet("shell", this, this.layer, this.gameScene);
            }




            this.allowShell = false;
            this.scheduleOnce(function () {
                this.allowShell = true;

            }
                .bind(this), 2);

        }


        if (this.allowNavigate) {

            if(cc.pool.hasObject(NavigateBullet)){

                cc.pool.getFromPool(NavigateBullet,"navigate", this, this.layer, this.gameScene);
                //trace("reuse bullets");

            }else{

                new NavigateBullet("navigate", this, this.layer, this.gameScene);
            }




            this.allowNavigate = false;
            this.scheduleOnce(function () {
                this.allowNavigate = true;

            }
                .bind(this), 2);

        }


        if(this.showLaser) {
            cc.game.particleManager.showLaser(cc.director.getRunningScene(), this);
            this.showLaser = false;
            this.scene.laserCheck = true;



            this.scene.scheduleOnce(function(){

                this.scene.laserCheck = false;
                this.scene.scheduleOnce(function(){

                    this.showLaser = true;

                }.bind(this), 10 + Math.random()*10);



            }.bind(this), 10);

        }



    },
    showHitEffect:function(harm, bulletLocation){

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


        cc.game.particleManager.showParticle("hit", this.scene, this, function(x, y){

            if(bulletLocation!=null)
                return {
                    //x:x+(40-Math.random()*80),
                    //y:y+(0-Math.random()*40)
                    x:bulletLocation.x,
                    y:bulletLocation.y+20
                };
            else
                return {
                    x:x+(40-Math.random()*80),
                    y:y+(0-Math.random()*40)
                };

        }, false);

    },
    explode:function(){

        cc.game.particleManager.showParticle("explode", this.scene, this, function(x, y){

            return {
                x:x,
                y:y
            };

        }, false);

        cc.game.stageManager.nextStage = true;


    },
    update:function(){

        if(this.laserEffect!= null){

            if(this.laserEffect.name == "absorb"){
                this.laserEffect.x = this.x;
                this.laserEffect.y = this.y -40;

            }


            if(this.laserEffect.name == "laser"){

                this.laserEffect.x = this.x;
                this.laserEffect.y = this.y -515;
            }

        }


    },
    laserCheck:function(scene, layer, plane){


        if(plane.x > this.x-30 && plane.x < this.x+30 && plane.y < this.y -30) {
            plane.blood -= 5;

            if(plane.laserHit == true) {
                this.showHitEffect(0);
                plane.laserHit = false;

                plane.scheduleOnce(function(){

                    this.laserHit = true;

                }.bind(plane),0.5);

            }

        }





    }



});