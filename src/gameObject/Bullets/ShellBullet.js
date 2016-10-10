


var ShellBullet = Bullet.extend({


    BulletType:{
        "shell" : "res/bullet/bullet_shell.png"
    },
    BulletLocation : {
        "shell" : [{x:-75, y:-20}, {x:75, y:-20}]
    },
    BulletOwner:"enemy",
    harm: 300,
    _shot:function(){

        for(var i =0;i<this.BulletLocation[this.type].length;i++){

            var bulletLocation = this.BulletLocation[this.type][i];
            var newBullet = new cc.Sprite(this.BulletType[this.type]);
            newBullet.scale = 0.3;
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

        var action = cc.moveTo(2, cc.p(newBullet.x, -400));
        newBullet.runAction(action);


    }



});