


var BasicBullet = Bullet.extend({


    BulletType:{
        "basic" : "res/bullet/bullet_basic.png"
    },
    BulletLocation : {
        "basic" : [{x:0, y:0}]
    },
    BulletOwner:"enemy",
    harm : 5,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.15;
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

        var action = cc.moveTo(4, cc.p(newBullet.x, -(cc.director.getWinSize().height+300)));
        var rotation = cc.rotateBy(10,3600, 3600);
        newBullet.runAction(cc.spawn(action,rotation));


    }



});