var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled-demo.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, cursors, background, scenery, plants, dude;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // add map
  map = game.add.tilemap('map');
  // add tileset image: @param1: name of file in json, image key in preload
  map.addTilesetImage('Desert', 'desert');
  // this is the background layer
  background = map.createLayer('Background');
  scenery = map.createLayer('Scenery');
  plants = map.createLayer('Plants');
  // only need to call resizeWorld once at end
  plants.resizeWorld();

  /* DUDE */
  dude = game.add.sprite(0, 250, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  game.camera.follow(dude);
  dude.body.gravity.y = 500;
  dude.body.bounce.y = 0.3;
  dude.body.collideWorldBounds = true;


  cursors = game.input.keyboard.createCursorKeys();
}


function update(){
    // game.physics.arcade.collide(dude, platforms);

    if(cursors.left.isDown){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }
    else if(cursors.right.isDown){
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }else{
      dude.body.velocity.x = 0;
      dude.animations.stop();
      dude.frame = 4;
    }

    if(cursors.up.isDown && dude.body.touching.down){
      dude.body.velocity.y = -350;
      jump.play();
    }
  }
