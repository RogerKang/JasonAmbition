
var DefaultBullet = Bullet.extend({


    BulletType:{
        "normal" : "res/bullet/bullet.png"
    },
    BulletLocation : {
        "normal" : [{x:-20, y:20}, {x:20, y:20}]
    },
    BulletOwner:"player",
    harm:10,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.2;
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

        var action = cc.moveTo(2, cc.p(newBullet.x, cc.director.getWinSize().height+300));
        newBullet.runAction(action);


    }



});