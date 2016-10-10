

var ParticleManager = cc.Class.extend({

    nodeLibrary:null,
    reader:null,
    animationManager:null,
    ccbNode:null,
    readerCache:{},
    fireEffect:[],


    particleList:{

        hit:"/res/particle/wsparticle_hit_01.ccbi",
        explode:"/res/particle/wsparticle_hit_02.ccbi",
        missile:"res/particle/wsparticle_tailinga.ccbi",
        blood:"res/particle/wsparticle_revival01.ccbi",
        shield: "res/particle/wsparticle_buff01.ccbi",
        bigBang: "res/particle/wsparticle_item_boom_02.ccbi",
        shine: "res/particle/wsparticle_universallylight2.ccbi",
        ultra:"res/particle/wsparticle_super02.ccbi",
        bomb:"/res/particle/wsparticle_hit_03.ccbi",
        warning:"/res/particle/wsparticle_warning.ccbi"

    },

    ctor:function(){

        this.nodeLibrary = new cc.NodeLoaderLibrary();
        this.nodeLibrary.registerDefaultCCNodeLoaders();
        this.readerCache = {};
        this.fireEffect = [];
        //this.reader = new cc.BuilderReader(new cc.BuilderReader(this.nodeLibrary, null, null, null));
        //this.animationManager = new cc.BuilderAnimationManager();
        //this.ccbNode = null;
        //var ccbNode = reader.readNodeGraphFromFile("res/particle/wsparticle_item_boom_02.ccbi", null, null, animationManager);
        //ccbNode.x = cc.game.winSize.width / 2;
        //ccbNode.y = cc.game.winSize.height / 2;

    },
    showParticle:function(particleName, scene, target, locationFunc, follow, endurance){


        //var nodeLibrary = new cc.NodeLoaderLibrary();
        //nodeLibrary.registerDefaultCCNodeLoaders();
        //var reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));
        //var ccbNode = reader.readNodeGraphFromFile(this.particleList[particleName], null, null, new cc.BuilderAnimationManager());
        //ccbNode.x = target.x;
        //ccbNode.y = target.y;
        //scene.addChild(ccbNode);

        if(endurance == null)
            endurance = 2;

        if(this.readerCache[particleName] == null)
            this.readerCache[particleName] = [];


        var reader = null;
        if( this.readerCache[particleName]!=null && this.readerCache[particleName].length>0) {
            reader = this.readerCache[particleName][0];
            this.readerCache[particleName].splice(0,1);
            trace("reuse reader");
            var location = locationFunc(target.x, target.y);
            reader.ccbNode.x = location.x;
            reader.ccbNode.y = location.y;

            // for missile particle re-show bug
            if(particleName != "missile")
                scene.addChild(reader.ccbNode);

            reader.getAnimationManager().runAnimations(0,0);

            reader.ccbNode.scheduleOnce(function(){

                this.readerCache[particleName].push(reader);
                //reader.ccbNode.stopAllActions();

                if(particleName == "missile"){

                    // for missile particle re-show bug
                    reader.ccbNode.x = -400;
                    reader.ccbNode.y = -400;

                }
                else
                    scene.removeChild(reader.ccbNode);

            }.bind(this), endurance);

            return reader.ccbNode;


        }
        else{
            var nodeLibrary = new cc.NodeLoaderLibrary();
            nodeLibrary.registerDefaultCCNodeLoaders();
            reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));


            var ccbNode = reader.readNodeGraphFromFile(this.particleList[particleName], null, null, new cc.BuilderAnimationManager());
            var location = locationFunc(target.x, target.y);
            ccbNode.x = location.x;
            ccbNode.y = location.y;
            scene.addChild(ccbNode);

            reader.ccbNode = ccbNode;

            reader.ccbNode.scheduleOnce(function(){

                this.readerCache[particleName].push(reader);
                //reader.ccbNode.stopAllActions();
                if(particleName == "missile") {

                    // for missile particle re-show bug
                    reader.ccbNode.x = -400;
                    reader.ccbNode.y = -400;
                }
                else
                    scene.removeChild(reader.ccbNode);

            }.bind(this), endurance);

            return ccbNode;


        }



        //this.scheduleOnce(function(){
        //
        //    this.gameScene.removeChild(ccbNode);
        //
        //}.bind(this), 2);

        //var ccbNode = this.reader.readNodeGraphFromFile(this.particleList[particleName], null, null, this.animationManager);
        //var location = locationFunc(target.x, target.y);
        //ccbNode.x = location.x;
        //ccbNode.y = location.y;
        //scene.addChild(ccbNode);



    },
    showFire:function(plane){

        var hitEffect = null;
        if(this.fireEffect == null || this.fireEffect.length == 0) {
            hitEffect = new cc.ParticleSystem("res/particle2/particle.plist");
            hitEffect.duration = -1;
            hitEffect.setAutoRemoveOnFinish(true);
            hitEffect.x = plane.x;
            hitEffect.y = plane.y;
            plane.gameScene.addChild(hitEffect);
            plane.hitEffect = hitEffect;


            plane.scheduleOnce(function(){

                plane.hitEffect = null;
                //plane.gameScene.removeChild(hitEffect);
                hitEffect.x = -1000;
                hitEffect.y = -1000;

                this.fireEffect.push(hitEffect);


            }.bind(this), 1);

        }else{
            hitEffect = this.fireEffect[0];
            this.fireEffect.splice(0, 1);
            hitEffect.duration = 1;
            hitEffect.setAutoRemoveOnFinish(true);
            hitEffect.x = plane.x;
            hitEffect.y = plane.y;
            //plane.gameScene.addChild(hitEffect);
            plane.hitEffect = hitEffect;

            plane.scheduleOnce(function(){

                plane.hitEffect = null;
                //plane.gameScene.removeChild(hitEffect);
                hitEffect.x = -1000;
                hitEffect.y = -1000;
                this.fireEffect.push(hitEffect);


            }.bind(this), 1);


        }


    },

    showLaser:function(scene, plane){


        var laserEffect = new cc.ParticleSystem("res/customParticle/absorb/particle.plist");
        laserEffect.name = "absorb";
        laserEffect.scale = 0.5;
        laserEffect.duration = 5;
        laserEffect.setAutoRemoveOnFinish(true);
        laserEffect.x = plane.x;
        laserEffect.y = plane.y-20;
        scene.addChild(laserEffect);
        plane.laserEffect = laserEffect;

        scene.scheduleOnce(function(){




            var size = cc.winSize;
            var laser = new cc.Sprite();
            var animation = new cc.Animation();
            for (var i = 0; i < animation_pngs.length; i++) {
                animation.addSpriteFrameWithFile(animation_pngs[i]);
            }
            animation.setDelayPerUnit(1/24);
            var action = cc.animate(animation);
            action.repeatForever();
            laser.runAction(action);
            scene.addChild(laser);
            laser.x = plane.x;
            laser.y = plane.y-515;
            laser.setOpacity(250);
            laser.scaleX = 1.5;
            laser.scaleY = 2;
            laser.name = "laser";

            scene.laser = laser;
            plane.laserEffect = laser;

            scene.scheduleOnce(function(){

                scene.removeChild(scene.laser);
                scene.laser = null;
                plane.laserEffect = null;


            }, 5);


        }, 5);




    }





});