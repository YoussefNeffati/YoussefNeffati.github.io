class Enemy {
    constructor() {
        this.x;
        this.y;
        this.percentFire = .01;
        this.chance = 0;
        this.alive = false;
        this.collidableWith = "bullet";
        this.type = "enemy";
    }

    spawn(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.speedX = 0;
        this.speedY = speed;
        this.alive = true;
        this.leftEdge = this.x - 90;
        this.rightEdge = this.x + 90;
        this.bottomEdge = this.y + 140;
    }

    draw() {
        this.context.clearRect(this.x - 1, this.y, this.width + 1, this.height);
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= this.leftEdge) {
            this.speedX = this.speed;
        }
        else if (this.x >= this.rightEdge + this.width) {
            this.speedX = -this.speed;
        }
        else if (this.y >= this.bottomEdge) {
            this.speed = 1.5;
            this.speedY = 0;
            this.y -= 5;
            this.speedX = -this.speed;
        }

        if (!this.isColliding) {
            this.context.drawImage(imageRepository.enemy, this.x, this.y);

            // Enemy has a chance to shoot every movement
            chance = Math.floor(Math.random() * 101);
            if (chance / 100 < percentFire) {
                this.fire();
            }

            return false;
        }
        else {
            game.playerScore += 10;
            game.explosion.get();
            return true;
        }
    }

    fire() {
        game.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5);
    }

    clear() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
        this.isColliding = false;
    }

}
