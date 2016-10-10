
var Bullet = cc.Class.extend({

    //BulletType:{
    //    "normal" : "res/bullet.png"
    //},
    //BulletLocation : {
    //    "normal" : [{x:-20, y:20}, {x:20, y:20}]
    //},
    BulletOwner:null,
    type:null,
    plane:null,
    layer:null,
    action:null,
    bullets:null,
    scene:null,
    ctor:function(type, plane, layer, scene){
        this.type = type;
        this.plane = plane;
        this.layer = layer;
        this.scene = scene;
        this.bullets = [];
        this._shot();

    },
    _validate:function(){

      var valid = false;
        for(var i =0;i<this.bullets.length;i++){

            var childBullet = this.bullets[i];

            if(childBullet.x>=-20 && childBullet.x<=cc.game.winSize.width+20 && childBullet.y>=0 && childBullet.y<=cc.game.winSize.height+20){

                valid = true;
                break;
            }else{

                valid = false;
                //break;

            }


        }
        return valid;


    },

    reuse:function(type, plane, layer, scene){

        this.ctor(type, plane, layer, scene);

    },
    unuse:function(){

        for(var i =0;i<this.bullets.length;i++){

            this.bullets[i].stopAllActions();
            this.layer.removeChild(this.bullets[i]);


        }

    },
    _shot:function(){}



});