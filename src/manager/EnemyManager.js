

var EnemyManager = cc.Class.extend({

    allowAddNewEnemy: true,
    privateSprite:null,
    enemyList:[

        Alpha,
        Beta,
        Gamma
        ],

    enemyFrequency:1,

    ctor: function () {
        this.privateSprite = new cc.Sprite();
        this.allowAddNewEnemy = true;
    },

    addEnemy: function (scene, layer, frequency) {

        if (this.allowAddNewEnemy == false)
            return;

        //new Alpha(scene, layer);
        //trace("New enemy");
        this.allowAddNewEnemy = false;


        var enemyType = this.enemyList[new Date().getTime() % this.enemyList.length];

        if(cc.pool.hasObject(enemyType)){

            cc.pool.getFromPool(enemyType, scene, layer);
            trace("reuse enemy");

        }else{

            new enemyType(scene, layer);
        }


        scene.scheduleOnce(function () {

            trace("allow new enemy");
            this.allowAddNewEnemy = true;


        }
            .bind(this),this.enemyFrequency);


    },
    addBoss : function(scene, layer){

        new Jason(scene, layer);

    },
    removeEnemy:function(scene, layer, enemy, index){

        scene.score+=enemy.score;

        layer.removeChild(enemy);
        scene.enemies.splice(index, 1);
        cc.pool.putInPool(enemy);


    },
    enemyAttack:function(scene){


        for(var i =0;i<scene.enemies.length;i++){

            scene.enemies[i].attack();

        }


    },
    _collide:function(x1, y1, x2, y2, threshold){

        if((Math.pow((x1-x2),2)+Math.pow((y1-y2),2))>Math.pow(threshold, 2))
            return false;
        else
            return true;

    },
    collisionCheck:function(scene, layer, plane){

        var enemies = scene.enemies;

        for(var i = 0;i<enemies.length;i++){

            var checkEnemy = enemies[i];

            if(this._collide(checkEnemy.x, checkEnemy.y, plane.x, plane.y, checkEnemy.threshold) == true){


                plane.blood -= checkEnemy.explosionHarm;
                scene.score += checkEnemy.score;
                checkEnemy.explode();

                this.removeEnemy(scene, layer, checkEnemy, i);
                i--;





            }






        }





    },
    outEnemyCheck : function(scene, layer){

        var enemies = scene.enemies;

        for(var i = 0;i<enemies.length;i++){

            var checkEnemy = enemies[i];

            if(checkEnemy.x>-200 && checkEnemy.x<cc.game.winSize.width+200 && checkEnemy.y>-200 && cc.game.winSize.height+200)
                ;
            else {

                trace("unuse out ennemy");
                this.removeEnemy(scene, layer, checkEnemy, i);
                i--;

            }




        }


    }
});