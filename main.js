var defaultStage = [{name:"normal", duration: 20}, {name:"mega", duration: 20}, {name:"boss", duration:100000}];

cc.game.onStart = function(){
    cc.view.adjustViewPort(false);
    cc.view.setDesignResolutionSize(512, 768, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.game.musicManager = new MusicManager();
        cc.game.bulletManager = new BulletManager();
        cc.game.enemyManager = new EnemyManager();
        cc.game.itemManager = new ItemManager();
        cc.game.particleManager = new ParticleManager();
        cc.game.stageManager = new StageManager(defaultStage);
        cc.director.runScene(new MenuScene());
        cc.director.setDisplayStats(false);
    }, this);
};
cc.game.run();

var trace = function() {
    //cc.log(Array.prototype.join.call(arguments, ", "));
};