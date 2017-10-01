$(document).ready(function () {
    var canvas = $('#canvas')[0];
    var c = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.backgroundColor = '#301F36';
    canvas.style.top = 0;
    canvas.style.left = 0;
    var mouse = {};
    var midScreenWidth;
    var midScreenHeight;

    addEventListener('mousemove', function () {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
    });
    
    window.addEventListener('resize', function () {
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		init();
    });

    var colors = [
		'#89FEFA',
		'#20D5F6',
		'#1873B9',
		'#2B3FB2',
		'#0B0A89'
	];
    
    function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function Planet(x, y, radius, color, strokeStyle){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.strokeStyle = strokeStyle;

        this.update = function(){
            this.draw();
        }

        this.draw = function(){
            c.lineWidth = '12';
            c.fillStyle = this.color;
            c.strokeStyle = this.strokeStyle;
            c.fill();
            c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, this.color);
			c.stroke();
			c.closePath();
        }
    }

    function Shield(x, y, width, height, color, planetToShield){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.yMaxDist = planetToShield.radius + 60;
        this.xMaxDist = planetToShield.radius + 60;

        this.update = function(){
            if(mouse.x > midScreenWidth + this.xMaxDist || mouse.x < midScreenWidth - this.xMaxDist){
                if(mouse.x > midScreenWidth + this.xMaxDist){
                    this.x = this.xMaxDist + midScreenWidth - 25;
                } else{
                    this.x = midScreenWidth - this.xMaxDist - 25;
                }
                
            } else{
                this.x = mouse.x - 25;
            }
            

            if(mouse.y > midScreenHeight + this.yMaxDist || mouse.y < midScreenHeight - this.yMaxDist){
                if(mouse.y > midScreenHeight + this.yMaxDist){
                    this.y = this.yMaxDist + midScreenHeight - 5;
                } else{
                    this.y = midScreenHeight - this.yMaxDist - 5;
                }
                
            } else{
                this.y = mouse.y - 5;
            }
            this.draw();
        }

        this.draw = function(){
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.width, this.height, this.color);
            c.beginPath;
            c.stroke();
            c.closePath();
        }
    }

    var planet;
    var asteroids = []
    var shield;
    var x;
    var y;
    var radius;
    var color;
    var planetRadius;
    var radians;
    function init(){
        midScreenWidth = innerWidth / 2;
        midScreenHeight = innerHeight / 2;
        planetRadius = (innerWidth <= innerHeight) ? innerWidth / 8 : innerHeight / 8;
        planet = new Planet(midScreenWidth, midScreenHeight, planetRadius, 'gray', 'silver');
        shield = new Shield(planet.x + planet.radius + 50, planet.y + planet.radius + 50, 50, 10, 'silver', planet);
    }

    function animate() {
		requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        planet.update();
        shield.update();

	}

    init();
    animate();
});