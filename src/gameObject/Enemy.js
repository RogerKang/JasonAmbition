
var Enemy = cc.Sprite.extend({

    bullets:null,
    scene:null,
    layer:null,
    score:null,
    blood:null,
    explosionHarm:null,
    //ctor:function(image){
    //
    //    this._super(image);
    //
    //
    //},
    appear:function(){},
    attack:function(){},
    explode:function(){},
    hurt:function(){},
    move:function(){},
    reuse:function(scene, layer){

        trace("reuse enemy:");
        this.ctor(scene, layer);

    },
    unuse:function(){


        this.layer.removeChild(this);



    }


});