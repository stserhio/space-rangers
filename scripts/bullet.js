export default class Bullet{
    constructor(ship_x, ship_y){
        this.width = 5
        this.height = 15
        this.velocity = {
            y: 30
        }

        this.image = document.getElementById('bullet')
        this.position = {
            x: ship_x - this.image.width / 2,
            y: ship_y
        }

        this.hitbox = {
            x: this.position.x + 10,
            y: this.position.y + 10,
            w: this.image.width - 20,
            h: this.image.height - 20
        }
    }

    update(dt){

        this.hitbox.y -= this.velocity.y
        this.position.y -= this.velocity.y
        
    }

    render(dt, ctx, canvas){
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.image.width, this.image.height)
        // ctx.lineWith = 2;
        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h)
    }
    
}