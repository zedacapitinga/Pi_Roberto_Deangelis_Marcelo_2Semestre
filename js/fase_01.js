var Calciumtrice = Calciumtrice || {};

Calciumtrice.Fase_01 = function () {};

Calciumtrice.Fase_01.prototype = {
    create: function () {
        setFase('fase_01');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.somFase = this.game.add.audio('somFase');
        this.somFase.volume = 0.1;
        this.somFase.loopFull();
        
        this.easystar = new EasyStar.js();
        
        this.mapaGlobal = new TileMap(this.game, 'mapa01');
        
        this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');
        
        this.layerChao = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel.alpha = 0.5;
        this.layerParede = this.mapaGlobal.createLayer('paredes');
        
        this.layerChao.resizeWorld();
        
        this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');
        
        this.mapaAtual = this.convert((this.mapaGlobal.layer).data);
        
        this.easystar.setGrid(this.mapaAtual);
        
        this.easystar.setAcceptableTiles([1]); 
        
        this.hud = this.game.add.sprite(50, 400, 'hud');
        this.hud.scale.set(0.6);
        this.hud.fixedToCamera = true;
        
        this.vidaJogador = this.game.add.text(76, 502, '100/100', { font: "24px Arial", fill: "#fdb317", align: "center" });
        this.vidaJogador.fixedToCamera = true;
        
        this.tirosJogador = this.game.add.text(76, 442, '25', { font: "24px Arial", fill: "#fdb317", align: "center" });
        this.tirosJogador.fixedToCamera = true;
        
        this.saida = this.mapaGlobal.createFromObject('objetos', 5, 'porta');
        this.game.physics.arcade.enable(this.saida);
        this.saida.enableBody = true;
        
        this.jogador = this.mapaGlobal.createFromObject('objetos', 9, 'heroi', 0, true, true, Jogador);
        this.layerChao.mask = this.jogador.luz;
        
        this.inimigos = this.game.add.group();
        this.criaAudio();
        this.criaInimigo('spawnInimigoDificil', Forte);
        this.inimigos.sort();
        
        this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
        this.jogador.setGroupInimigos(this.inimigos);
    },
    criaInimigo: function(tipo, nivel){
        this.inimigosLocal = this.mapaGlobal.findObjectsByType(tipo);
        for(var i= 0;i <  this.inimigosLocal.length; i++){
            var inimigoI = this.inimigosLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new nivel(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow, this.somZumbi);
            inimigo.cria();
            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };  
    },
    criaAudio: function(){
        this.somZumbi = this.game.add.audio('somZumbi');
        this.somZumbi.allowMultiple = true;
        this.somZumbi.addMarker('zumbi1', 0, 0.850);
        this.somZumbi.addMarker('zumbi2', 0.850, 1.560);
        this.somZumbi.addMarker('zumbi3', 1.560, 2.143);
        this.somZumbi.addMarker('zumbi4', 2.143, 2.871);
        this.somZumbi.addMarker('zumbi5', 2.871, 3.373);
        this.somZumbi.addMarker('zumbi6', 3.373, 3.912);
        this.somZumbi.addMarker('zumbi7', 3.912, 4.495);
        this.somZumbi.addMarker('zumbi8', 4.495, 5.332);
        this.somZumbi.addMarker('zumbi9', 5.332, 6.205);
        this.somZumbi.addMarker('zumbi10', 6.205, 6.892);
        this.somZumbi.addMarker('zumbi11', 6.892, 7.399);
        this.somZumbi.addMarker('zumbi12', 7.399, 8.186);
        this.somZumbi.addMarker('zumbi13', 8.186, 8.746);
        this.somZumbi.addMarker('zumbi14', 8.746, 9.411);
        this.somZumbi.addMarker('zumbi15', 9.411, 10.289);
        this.somZumbi.addMarker('zumbi16', 10.289, 11.727);
        this.somZumbi.addMarker('zumbi17', 11.727, 13.310);
        this.somZumbi.addMarker('zumbi18', 13.310, 14.413);
        this.somZumbi.addMarker('zumbi19', 14.413, 15.390);
        this.somZumbi.addMarker('zumbi20', 15.390, 16.354);
        this.somZumbi.addMarker('zumbi21', 16.354, 17.434);
        this.somZumbi.addMarker('zumbi22', 17.434, 18.099);
        this.somZumbi.addMarker('zumbi23', 18.099, 18.913);
        this.somZumbi.addMarker('zumbi24', 18.913, 19.244);  
    },
    convert: function(_obj){
        var elemento = [];
        for(var i = 0; i < _obj.length; i++){
            elemento[i] = [];
            for(var j = 0; j < _obj[i].length; j++){
                elemento[i][j] = _obj[i][j].index;
            }
        }
    return elemento;
    },
    fimDeJogo: function(){        
        this.somFase.pause();
        
        var telaFimDeJogo = this.game.add.sprite(0, 0, "faleceu");
        telaFimDeJogo.fixedToCamera = true;
        telaFimDeJogo.alpha = 0.01;
        this.game.add.tween(telaFimDeJogo).to( { alpha: 0.5 }, 2000, "Linear", true);
        this.game.time.events.add(Phaser.Timer.SECOND*3, function(){
            telaFimDeJogo.destroy();
            this.somFase.destroy();
                this.state.start('faleceuState');
            }, this);
    },
    passaFase:function(){
        Calciumtrice.game.state.start('fase_02'); 
    },
    update: function () {   
        if(this.jogador.vida < 1){
            this.fimDeJogo()   
        };
        
        this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);
        this.game.physics.arcade.collide(this.jogador.shadow, this.saida, this.passaFase);        
        this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);        
        this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);

        this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    render: function(){
        Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00"); 
    }
}