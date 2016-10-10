




var NavigateBullet = Bullet.extend({


    BulletType:{
        "navigate" : "res/bullet/bullet_navigate.png"
    },
    BulletLocation : {
        "navigate" : [{x:-50, y:-20}, {x:50, y:-20}]
    },
    BulletOwner:"enemy",
    harm: 100,
    speed:500,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.12;
            newBullet.x = this.plane.x+bulletLocation.x;
            newBullet.y = this.plane.y+bulletLocation.y;
            newBullet.harm = this.harm;
            this.runBulletCustomAction(newBullet);
            this.layer.addChild(newBullet, 1);
            this.bullets.push(newBullet);
        }
        this.layer.bullets.push(this);


    },
    runBulletCustomAction:function(newBullet){

        var plane = cc.director.getRunningScene().plane;

        var deltaX = plane.x - newBullet.x;
        var deltaY = plane.y - newBullet.y;
        var deltaD = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
        var enemyX = newBullet.x + 2000*deltaX/deltaD;
        var enemyY = newBullet.y + 2000*deltaY/deltaD;


        var rotationAngle = Math.atan((enemyY - newBullet.y)/(enemyX - newBullet.x))*360/(2*Math.PI);

        if((enemyX - newBullet.x)>=0)
            ;
        else
            rotationAngle += 180;

        if(rotationAngle<0)
            rotationAngle +=360;

        rotationAngle = 90 - rotationAngle;

        var duration = Math.sqrt(Math.pow(enemyX - newBullet.x, 2) + Math.pow(enemyY - newBullet.y, 2))/this.speed;
        var rotationAction = cc.rotateTo(0.01,rotationAngle);

        var action = cc.moveTo(duration, cc.p(enemyX, enemyY));
        newBullet.runAction(cc.spawn(action,rotationAction));


    }



});