


var ItemManager = cc.Class.extend({

    scene:null,
    layer:null,
    plane:null,
    items:{
        missile:"res/items/missile.png",
        blood:"res/items/blood.png",
        shield:"res/items/shield.png",
        bigBang:"res/items/bigBang.png",
        shine:"res/items/shine.png",
        ultra:"res/items/ultra.png"
    },
    itemName:["missile", "blood", "shield", "bigBang", "shine", "ultra"],
    basicGap: 2,
    randomGap: 3,
    allowAddItem:true,
    floatingItems:[],

    privateSprite:null,
    durableEffectFunc:[],
    allowDurableEffect:true,

    ctor:function(){

        this.privateSprite = new cc.Sprite();
        this.durableEffectFunc = []; // remove durable effect when re-init game
        this.floatingItems = [];
        this.allowDurableEffect = true;
        this.allowAddItem = true;

    },
    generateItem:function(scene, layer, plane){

        if(this.allowAddItem == false)
            return ;

        if(this.allowAddItem == true) {
            var item = this.itemName[new Date().getTime() % this.itemName.length];
            //item = this.itemName[1];
            var itemSprite = new cc.Sprite(this.items[item]);
            itemSprite.itemName = item;
            itemSprite.scale = 0.3;
            itemSprite.x = Math.round(Math.random() * cc.game.winSize.width);
            itemSprite.y = cc.game.winSize.height + 100;
            var moveAction = cc.moveTo(6, cc.p(Math.random() * cc.game.winSize.width, -400));
            itemSprite.runAction(moveAction);

            layer.addChild(itemSprite, 5);
            scene.items.push(itemSprite);


            this.allowAddItem = false;

            scene.scheduleOnce(function(){

                this.allowAddItem = true;

            }.bind(this), Math.random()*this.randomGap+this.basicGap);



        }
    },
    _collide:function(x1, y1, x2, y2, threshold){

        if((Math.pow((x1-x2),2)+Math.pow((y1-y2),2))>Math.pow(threshold, 2))
            return false;
        else
            return true;

    },
    collisionCheck:function(scene, layer, plane){

        var itemList = scene.items;

        for(var i=0;i<itemList.length;i++){

            var checkItem = itemList[i];

            if(this._collide(checkItem.x, checkItem.y, plane.x, plane.y, 50) == true){


                this.takeEffect(scene, checkItem.itemName, plane);

                layer.removeChild(checkItem);
                scene.items.splice(i, 1);
                i--;





            }




        }




    },
    takeEffect:function(scene, itemName, plane){


        switch(itemName){

            //case "blood": plane.blood += 200;cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_magnet01.ccbi", plane, 2);break;
            //case "blood": plane.blood += 200;cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_super02.ccbi", plane, 2);break;
            //case "blood": plane.blood += 200;cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_universallylight2.ccbi", plane, 2);break;
            //case "blood": plane.blood += 200;cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_revival01.ccbi", plane, 2);break;
            //case "blood": plane.blood += 200;cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_horse01.ccbi", plane, 2);break;
            case "blood": cc.game.itemManager.addPlaneEffect(scene, "blood", "res/particle/wsparticle_revival01.ccbi", plane, 2);break;
            case "shield":cc.game.itemManager.addPlaneEffect(scene, "shield", "res/particle/wsparticle_buff01.ccbi", plane, 10);break;
            case "missile":cc.game.itemManager.addPlaneEffect(scene, "missile","res/particle/wsparticle_tailinga.ccbi" , plane, 10);break;
            case "bigBang":cc.game.itemManager.addPlaneEffect(scene, "bigBang","res/particle/wsparticle_item_boom_02.ccbi" , plane, 10);break;
            case "shine":cc.game.itemManager.addPlaneEffect(scene, "shine","res/particle/wsparticle_universallylight2.ccbi" , plane, 10);break;
            case "ultra":cc.game.itemManager.addPlaneEffect(scene, "ultra","res/particle/wsparticle_super02.ccbi" , plane, 10);break;


        }



    },
    //addSimpleEffect:function(scene, effectName, plane){
    //
    //    var nodeLibrary = new cc.NodeLoaderLibrary();
    //    nodeLibrary.registerDefaultCCNodeLoaders();
    //    var reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));
    //    var ccbNode = reader.readNodeGraphFromFile(effectName, null, null, new cc.BuilderAnimationManager());
    //
    //    ccbNode.x = plane.x;
    //    ccbNode.y = plane.y;
    //    scene.addChild(ccbNode);
    //    scene.scheduleOnce(function(){
    //
    //        this.removeChild(ccbNode);
    //
    //    }.bind(scene), 2);
    //
    //
    //},
    addPlaneEffect:function(scene, effectName, effectCCBI, plane, duration){



        var timeStamp = new Date().getTime();

        //var nodeLibrary = new cc.NodeLoaderLibrary();
        //nodeLibrary.registerDefaultCCNodeLoaders();
        //var reader =new cc.BuilderReader(new cc.BuilderReader(nodeLibrary,null, null,null));
        //var ccbNode = reader.readNodeGraphFromFile(effectCCBI, null, null, new cc.BuilderAnimationManager());
        ////console.log(ccbNode);
        //ccbNode.x = plane.x;
        //ccbNode.y = plane.y;
        //scene.addChild(ccbNode);

        var locationFunc = null;
        var followTarget = null;

        switch (effectName){

            case "bigBang":locationFunc = function(x, y){

                return {
                    x:cc.game.winSize.width/2,
                    y:cc.game.winSize.height/2
                };

            };followTarget = false;break;
            default : locationFunc = function(x, y){

                return {
                    x:x,
                    y:y
                };

            };followTarget = true;break;

        }


        var ccbNode = cc.game.particleManager.showParticle(effectName, scene, plane, locationFunc,followTarget, duration);

        if(followTarget == true){
            plane.addedEffects.push({name:effectName, effect:ccbNode, timeStamp:timeStamp});
            scene.scheduleOnce(function(){

                //this.removeChild(ccbNode);
                this.plane.removeAddedEffect(timeStamp);

            }.bind(scene), duration);
        }


        this.instantEffect(scene, effectName, plane);
        this.durableEffect(scene, effectName, plane);


    },
    instantEffect:function(scene, effectName,plane){


        switch (effectName){

            case "bigBang" : this.bigBang(scene, effectName,plane);break;
            case "blood"   : this.addBlood(scene, effectName,plane);break;


        }



    },
    durableEffect:function(scene, effectName,plane){


        switch (effectName){

            case "shine" : this.shineField(scene, effectName,plane);break;


        }



    },
    //_collide:function(x1, y1, x2, y2, threshold){
    //
    //    if((Math.pow((x1-x2),2)+Math.pow((y1-y2),2))>Math.pow(threshold, 2))
    //        return false;
    //    else
    //        return true;
    //
    //},
    shineField:function(scene, effectName,plane){


        this.durableEffectFunc.push({

                    effectName:"shine",
                    effectFunc:function (scene, layer, plane) {


                    var enemyList = scene.enemies;

                    for (var i = 0; i < enemyList.length; i++) {


                        var checkEnemy = enemyList[i];

                        if (((Math.pow((plane.x-checkEnemy.x),2)+Math.pow((plane.y-checkEnemy.y),2))<Math.pow(300, 2)) == true) {

                            checkEnemy.showHitEffect(10);
                            //checkEnemy.blood -= 10;
                            //
                            //if (checkEnemy.blood < 0)
                            //    checkEnemy.blood = 0;

                        }


                    }


                }});

        scene.scheduleOnce(function(){

            for(var j =0 ;j<this.durableEffectFunc.length;j++){

                if(this.durableEffectFunc[j].effectName == "shine"){

                    this.durableEffectFunc.splice(j, 1);
                    break;

                }


            }



        }.bind(this), 10);



    },
    bigBang:function(scene, effectName,plane){

        var enemyList = scene.enemies;

        for(var i=0;i<enemyList.length;i++){

            enemyList[i].blood -= 30;

            if(enemyList[i].blood < 0)
                enemyList[i].blood = 0;

        }


    },
    addBlood:function(scene, effectName,plane){

        plane.blood += 200;
        if(plane.blood > 5000)
            plane.blood = 5000;

    },
    applyDurableEffect:function(scene, layer, plane){

        if(this.durableEffectFunc.length>0 && this.allowDurableEffect == true){


            for(var i=0;i<this.durableEffectFunc.length;i++){


                var effectFunc = this.durableEffectFunc[i].effectFunc;
                effectFunc.call(scene, scene, layer, plane);



            }

            this.allowDurableEffect = false;

            scene.scheduleOnce(function(){

                this.allowDurableEffect = true;



            }.bind(this), 1);


        }

    }





});