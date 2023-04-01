import Stars from "./stars.js"
import MenuScene from "./menu.js"
import Background from "./backg.js"
import Player from "./player.js"
import Asteroid from "./asteroids.js"
import Explosion from "./explosion.js"

export default class GameScene{
    constructor(game){

        this.game = game
        this.stars = []
        this.asteroids = []
        this.explosions = []
        this.count = 0
        this.Init()
    }

    Init(){
        for(let i = 0; i < 200; i++){
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
        this.background = new Background(this.game)
        this.player = new Player(this.game)

    }
    
    update(dt){

        this.stars.forEach(
            (star, index) => {

                if(star.position.y > this.game.canvas.height){
                    setTimeout(() => {
                        this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -5))
                    }, 0)
                    
                }else{
                    star.update(dt)
                }
                
            }
        )
        this.background.update(dt)
        this.player.update(dt)

        if(this.count > 20){
            this.asteroids.push(new Asteroid(this.game))
            this.count = 0
        }

        
        

        this.asteroids.forEach((asteroid, index) => {
            if(asteroid.position.y > this.game.canvas.height){
                
                setTimeout(() => {
                    this.asteroids.splice(index, 1)
                }, 0)
                
            }else{
                asteroid.update(dt)
                this.player.bullets.forEach((bullet, i) => {
                    if(
                        asteroid.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
                        asteroid.hitbox.x + asteroid.hitbox.w > bullet.hitbox.x &&
                        asteroid.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
                        asteroid.hitbox.y + asteroid.hitbox.h > bullet.hitbox.y
                    ){
                        this.explosions.push(new Explosion(asteroid.position.x, asteroid.position.y))
                        this.player.bullets.splice(i, 1)
                        this.asteroids.splice(index, 1)
                    }
                
                })
            }
            
            
        })

        this.explosions.forEach((explosion, index)=> {
            if(explosion.delete) {
                this.explosions.splice(index, 1)
            }else{
                explosion.update(dt)
            }
        })

        if(this.game.checkKeyPress('Escape')){
            this.game.setScene(MenuScene);
        }
        this.count++
    }
        
    render(dt, ctx, canvas){
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.background.render(dt, ctx, canvas)

        this.stars.forEach(
            (star, index) => {
                star.render(dt, ctx, canvas)
            }
        )

        this.asteroids.forEach(
            (asteroid, index) => {
                asteroid.render(dt, ctx, canvas)
            }
        )

        this.explosions.forEach((explosion, index)=> {
            explosion.render(dt, ctx, canvas)
        })
        this.player.render(dt, ctx, canvas)
        
    }
}