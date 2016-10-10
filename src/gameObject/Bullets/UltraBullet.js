



var UltraBullet = Bullet.extend({


    BulletType:{
        "ultra" : "res/bullet/bullet_ultra.png"
    },
    BulletLocation : {
        "ultra" : [{x:-30, y:0},{x:30, y:0},{x:-20,y:0},{x:20, y:0},{x:-40,y:0},{x:40,y:0}]
    },
    BulletDirection:{
        "ultra":[{x:30, y:-90}, {x:-30,y:-90},{x:30,y:-150},{x:-30,y:-150},{x:30,y:-45},{x:-30,y:-45}]

    },
    BulletOwner:"player",
    harm : 30,
    speed:2000,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.55;
            newBullet.x = this.plane.x+bulletLocation.x;
            newBullet.y = this.plane.y+bulletLocation.y;
            newBullet.harm = this.harm;
            newBullet.direction = this.BulletDirection[this.type][i];
            this.runBulletCustomAction(newBullet);
            this.layer.addChild(newBullet, 1);
            this.bullets.push(newBullet);
        }
        this.layer.bullets.push(this);


    },
    runBulletCustomAction:function(newBullet){


        var deltaX = 0 - newBullet.direction.x;
        var deltaY = 0 - newBullet.direction.y;
        var deltaD = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
        var enemyX = newBullet.x + this.speed*deltaX/deltaD;
        var enemyY = newBullet.y + this.speed*deltaY/deltaD;

        var rotationAngle = Math.atan((enemyY - newBullet.y)/(enemyX - newBullet.x))*360/(2*Math.PI);

        if((enemyX - newBullet.x)>=0)
            ;
        else
            rotationAngle += 180;

        if(rotationAngle<0)
            rotationAngle +=360;

        rotationAngle = 90 - rotationAngle;

        var action = cc.moveTo(4, cc.p(enemyX, enemyY));

        var rotationAction = cc.rotateTo(0.01,rotationAngle);
        newBullet.runAction(cc.spawn(action,rotationAction));
        //console.log(enemyX+","+enemyY);


    }



});