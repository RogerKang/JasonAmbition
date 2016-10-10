

var StageManager = cc.Class.extend({

    stage:0,
    stageList:null,
    nextStage:true,
    stageFunc:null,
    preStageFunc:null,

    ctor:function(stageList){

        this.stageList = stageList;
        this.nextStage = true;
        this.stage = -1;
        this.stageFunc={};
        this.preStageFunc = {};
        this.stageFunc["normal"] = this.normalStage;
        this.stageFunc["mega"] = this.megaStage;
        this.stageFunc["boss"] = this.bossStage;
        this.preStageFunc["boss"] = this.preBossStage;


    },
    manageGameStage:function(scene, layer, plane){


        if(this.nextStage == true){

            if(this.stage<this.stageList.length-1){


                this.stage++;

                //console.log("Change stage to:"+this.stageList[this.stage].name);

                if(this.preStageFunc[this.stageList[this.stage].name] != null)
                    this.preStageFunc[this.stageList[this.stage].name](scene, layer, plane);

                this.stageFunc[this.stageList[this.stage].name](scene, layer, plane);
                this.nextStage = false;

                scene.scheduleOnce(function(){

                    this.nextStage = true;

                }.bind(this), this.stageList[this.stage].duration);






            }else{


                this.endStage(scene);

            }


        }else{
            this.stageFunc[this.stageList[this.stage].name](scene, layer, plane);


        }


    },
    endStage:function(scene){

        //console.log("End stage.");
        //cc.director.pause();

        new GameOverLayer(scene);

    },
    normalStage:function(scene, layer, plane){


        scene.plane._shot();
        cc.game.enemyManager.addEnemy(scene, layer, 0.2);
        cc.game.enemyManager.enemyAttack(scene);

        cc.game.bulletManager.manageBullet(layer);
        cc.game.bulletManager.collisionCheck(scene, layer);
        cc.game.bulletManager.updateBulletLocation(scene, layer, plane);
        cc.game.enemyManager.collisionCheck(scene, layer, plane);
        cc.game.enemyManager.outEnemyCheck(scene, layer);

        scene.plane.update();
        scene.gameInfo.update();

        if(scene.boss!=null)
            scene.boss.update();

        if(scene.laserCheck == true)
            scene.boss.laserCheck(scene, layer, plane);

        cc.game.itemManager.generateItem(scene, layer, plane);
        cc.game.itemManager.collisionCheck(scene, layer, plane);
        cc.game.itemManager.applyDurableEffect(scene, layer, plane);


        if(plane.blood<=0) {
            trace("dead");
            //cc.director.pause();
            cc.game.stageManager.nextStage = true;
        }





    },
    megaStage:function(scene, layer, plane){

        cc.game.enemyManager.enemyFrequency = 1;
        cc.game.stageManager.normalStage(scene, layer, plane);

    },
    preBossStage:function(scene, layer, plane){

        cc.game.enemyManager.addBoss(scene, layer);
        cc.game.enemyManager.enemyFrequency = 3;
        cc.game.particleManager.showParticle("warning", scene, plane, function(x, y){

            return {
                x:cc.game.winSize.width/2,
                y:cc.game.winSize.height/2
            };

        },false, 4);

    },
    bossStage:function(scene, layer, plane){

        cc.game.stageManager.normalStage(scene, layer, plane);

    },




});