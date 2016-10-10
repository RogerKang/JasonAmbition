

var BulletManager = cc.Class.extend({

    BulletArray:[],
    ctor: function (gameScene) {
        //this._super();
        this.BulletArray = [];
    },
    manageBullet:function(layer){

        if(layer.bullets.length>0)
        for(var i=0;i<layer.bullets.length;i++){

            var bullet = layer.bullets[i];
            if(bullet._validate()==true)
            ;
            else{

                cc.pool.putInPool(bullet);
                layer.bullets.splice(i,1);
                i--;
            }


        }



    },
    collisionCheck:function(scene, layer){


        var playerX= scene.plane.x;
        var playerY= scene.plane.y;

        var bullets = layer.bullets;

        for(var i =0;i<bullets.length;i++) {

            var checkBullet = bullets[i];
            if (checkBullet.BulletOwner == "enemy") {

                for(var k =0;k<checkBullet.bullets.length;k++){

                    var childBullet = checkBullet.bullets[k];

                    if (this._collide(playerX, playerY, childBullet.x, childBullet.y, 50) == true) {

                        layer.removeChild(childBullet);
                        checkBullet.bullets.splice(k,1);
                        k--;

                        //var blinkAction = cc.blink(1,3);
                        //scene.plane.runAction(blinkAction);
                        scene.plane.showHitEffect(childBullet.harm);

                        if(checkBullet.bullets.length==0){
                            cc.pool.putInPool(checkBullet);
                            layer.bullets.splice(i, 1);
                            i--;

                        }

                    }

                }

            }
        }




        for(var s = 0;s<scene.enemies.length;s++){

            //trace("s:"+s);
            var checkEnemy = scene.enemies[s];
            var enemyX = checkEnemy.x;
            var enemyY = checkEnemy.y;

            for(var i =0;i<bullets.length;i++) {

                var checkBullet = bullets[i];
                if (checkBullet.BulletOwner == "player") {

                    for(var k =0;k<checkBullet.bullets.length;k++){

                        var childBullet = checkBullet.bullets[k];
                        var bulletX = childBullet.x;
                        var bulletY = childBullet.y;

                        if (this._collide(enemyX, enemyY, childBullet.x, childBullet.y, checkEnemy.threshold) == true) {

                            layer.removeChild(childBullet);
                            checkBullet.bullets.splice(k,1);
                            k--;

                            //var blinkAction = cc.blink(1,3);
                            //scene.plane.runAction(blinkAction);
                            checkEnemy.showHitEffect(childBullet.harm, {x:bulletX, y:bulletY});

                            if(checkBullet.bullets.length==0){
                                cc.pool.putInPool(checkBullet);
                                layer.bullets.splice(i, 1);
                                i--;

                            }




                        }

                    }

                }
            }


            // place out of inside loop, otherwise will case s++ run multiple times!
            trace(checkEnemy.blood);
            if(checkEnemy.blood<=0){


                checkEnemy.explode();
                cc.game.enemyManager.removeEnemy(scene, layer, checkEnemy, s);
                s--;


            }



            //check ennemy done
        }







    },
    _collide:function(x1, y1, x2, y2, threshold){

        if((Math.pow((x1-x2),2)+Math.pow((y1-y2),2))>Math.pow(threshold, 2))
            return false;
        else
            return true;

    },
    updateBulletLocation:function(scene, layer, plane){

        var bullets = layer.bullets;

        if(bullets!=null && bullets.length>0){

            for(var i=0;i<bullets.length;i++){


                if(bullets[i].updatePerFrames == true) {

                    for(var s=0;s<bullets[i].bullets.length;s++){

                        bullets[i].perFramesUpdate(scene, layer, plane, bullets[i].bullets[s]);

                    }



                }



            }



        }




    }

});