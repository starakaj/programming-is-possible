module.exports = class Heart {
    constructor(x, y, vx, vy, a, va) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.a = a;
        this.va = va;
        this._scale = 1.0;
    }

    set scale(s) {
        this._scale = s;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.a += this.va;
        this.vy += 1.0;
    }

    draw(p) {
        p.push();
        p.noFill();
        p.stroke(255, 135, 231);
        
        const n = 11;
        const u1 = 5;
        const v1 = -6;
        const u2 = 14;
        const v2 = 5;
        const v3 = 11;
        
        p.translate(this.x, this.y);
        p.rotate(this.a);
        p.scale(this._scale);
        p.strokeWeight(3 / this._scale);
        p.bezier(0, 0, 0 + u1/n, 0 + v1/n, 0 + u2/n, 0 + v2/n, 0, 0 + v3/n);
        p.bezier(0, 0, 0 - u1/n, 0 + v1/n, 0 - u2/n, 0 + v2/n, 0, 0 + v3/n);

        p.pop();
    }

    isOffscreen(p) {
        return this.x < 0 - this._scale ||
            this.x > p.width + this._scale ||
            this.y < 0 - this._scale ||
            this.y > p.height + this._scale;
    }
}