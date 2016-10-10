





var CometBullet = Bullet.extend({


    BulletType:{
        "comet" : "res/bullet/bullet_comet.png"
    },
    BulletLocation : {
        "comet" : [{x:-35, y:-10},{x:35, y:-10}]
    },
    BulletDirection:{
        "comet":[{x:30, y:-30}, {x:-30,y:-30}]

    },
    BulletOwner:"enemy",
    harm : 30,
    speed:2000,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.2;
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


        var action = cc.moveTo(3, cc.p(newBullet.x, -(cc.director.getWinSize().height+300)));
        newBullet.runAction(action);


    }



});