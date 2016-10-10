


var MissileBullet = Bullet.extend({


    BulletType:{
        "normal" : "res/bullet/bullet_ball.png"
    },
    BulletLocation : {
        "normal" : [{x:-40, y:20}, {x:40, y:20}]
    },
    BulletOwner:"player",
    harm:10,
    speed:800,
    updatePerFrames:true,
    allowSwitchEnemy:false,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.3;
            newBullet.x = this.plane.x+bulletLocation.x;
            newBullet.y = this.plane.y+bulletLocation.y;
            newBullet.harm = this.harm;
            newBullet.initial = true;
            newBullet.enemy = null;
            newBullet.lockEnemy = false;
            this.runBulletCustomAction(newBullet);
            this.layer.addChild(newBullet, 1);
            this.bullets.push(newBullet);
        }
        this.layer.bullets.push(this);


    },
    runBulletCustomAction:function(newBullet){

        //var action = cc.moveTo(2, cc.p(Math.random()*cc.game.winSize.width*3, Math.random()*cc.game.winSize.height+300));
        //newBullet.runAction(action);
        newBullet.oldX = newBullet.x-(Math.random()*1000-500);
        newBullet.oldY = newBullet.y - 500;
        var enemyLocation = this.aimedEnemy(newBullet.x, newBullet.y, newBullet.oldX, newBullet.oldY, newBullet);

        newBullet.oldX = newBullet.x;
        newBullet.oldY = newBullet.y;
        var action = cc.moveTo(enemyLocation.duration, cc.p(enemyLocation.x, enemyLocation.y));
        newBullet.runAction(cc.spawn(action));


    },
    aimedEnemy:function(bulletX, bulletY, oldX, oldY, bullet){

        var enemyX = 0;
        var enemyY = 0;
        var foundEnemy = false;

        if(this.allowSwitchEnemy == true || bullet.lockEnemy == false ) {
            if (this.scene.enemies != null && this.scene.enemies.length > 0) {

                var enemyList = this.scene.enemies;
                var leastDistance = 1000000000;
                var leastX = bulletX;
                var leastY = cc.game.winSize.height + 200;
                ;

                for (var i = 0; i < enemyList.length; i++) {

                    var checkEnemy = enemyList[i];

                    if (checkEnemy.x > 0 && checkEnemy.x < cc.game.winSize.width && checkEnemy.y > 0 && checkEnemy.y < cc.game.winSize.height)
                        ;
                    else
                        continue;


                    var distance = Math.pow((bulletX - checkEnemy.x), 2) + Math.pow((bulletY - checkEnemy.y), 2);

                    if (distance < leastDistance) {
                        foundEnemy = true;
                        bullet.lockEnemy = true;
                        bullet.enemy = checkEnemy;
                        leastDistance = distance;
                        leastX = checkEnemy.x;
                        leastY = checkEnemy.y;
                    }


                }

                enemyX = leastX;
                enemyY = leastY;


            }
        }else{

            if(bullet.enemy != null && this.scene.enemies.indexOf(bullet.enemy) > -1 ){

                foundEnemy = true;
                enemyX = bullet.enemy.x;
                enemyY = bullet.enemy.y;
            }


        }

        if(foundEnemy != true){
            var deltaX = bulletX - oldX;
            var deltaY = bulletY - oldY;
            var deltaD = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
            enemyX = bulletX + this.speed*deltaX/deltaD;
            enemyY = bulletY + this.speed*deltaY/deltaD;

        }


        var rotationAngle = Math.atan((enemyY - bulletY)/(enemyX - bulletX))*360/(2*Math.PI);

        if((enemyX - bulletX)>=0)
            ;
        else
            rotationAngle += 180;

        if(rotationAngle<0)
            rotationAngle +=360;

        rotationAngle = 90 - rotationAngle;

        //trace((enemyY - bulletY)+","+(enemyX - bulletX)+","+rotationAngle);
        //trace(enemyY+","+(bulletY)+","+(oldY));
        var duration = Math.sqrt(Math.pow(enemyX - bulletX, 2) + Math.pow(enemyY - bulletY, 2))/this.speed;


        //trace("bullet speed:"+duration);


        return {x:enemyX, y:enemyY, duration:duration, rotationAngle:rotationAngle};


    },
    perFramesUpdate:function(scene, layer, plane, bullet){


        if(bullet.initial == true) {

            bullet.scheduleOnce(function(){

                this.initial = false;

            }.bind(bullet), 0.2);

            return ;
        }


        //if(Math.abs(bullet.x - bullet.oldX)>10 || Math.abs(bullet.y - bullet.oldY)>10)
        //if(bullet.moveAction!=null)
        //    bullet.moveAction.speed(10000);
        //
        if(bullet.recentStop == null || bullet.recentStop == false) {
            bullet.stopAllActions();
            bullet.recentStop = true;

            bullet.scheduleOnce(function(){

                this.recentStop = false;

            }.bind(bullet), 0.02);

        }
        else
            return ;

        //if(bullet.moveAction!=null)
        // trace("speed:"+bullet.moveAction.getSpeed());
        //
        //bullet.stopAllActions();

        var enemyLocation = this.aimedEnemy(bullet.x, bullet.y, bullet.oldX, bullet.oldY, bullet);
        bullet.oldX = bullet.x;
        bullet.oldY = bullet.y;
        //trace("now:"+bullet.x+","+bullet.y);
        //trace(enemyLocation.x+","+enemyLocation.y);


        var action = cc.moveTo(enemyLocation.duration, cc.p(enemyLocation.x, enemyLocation.y));
        //var action = cc.moveTo(1, cc.p(bullet.x+1000, bullet.y+1000));
        //action.easing(cc.easeIn(20));
        //bullet.setRotationSkewX(enemyLocation.rotationAngle);
        var rotationAction = cc.rotateTo(0.01,enemyLocation.rotationAngle);
        //trace("angel:"+enemyLocation.rotationAngle);
        bullet.runAction(cc.spawn(action, rotationAction));
        bullet.moveAction = action;





    }



});