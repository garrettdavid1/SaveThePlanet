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
        this.distFromPlanet = 60;
        this.xOffset = -25;
        this.yOffset = -5;
        this.planetToShield = planetToShield;
        this.distFromCenter = this.planetToShield.radius + this.distFromPlanet;
        this.yMaxDist = midScreenHeight + planetToShield.radius + this.distFromPlanet;
        this.yMinDist = midScreenHeight - planetToShield.radius - this.distFromPlanet;
        this.xMaxDist = planetToShield.radius + this.distFromPlanet + midScreenWidth;
        this.xMinDist = midScreenWidth - planetToShield.radius - this.distFromPlanet;
        this.relX = 0;
        this.relY = 0;
        this.dist = 0;

        this.update = function(){

            // var mouseX = 0, mouseY = 0, limitX = 150-15, limitY = 150-15;
            // var centerX = limitX / 2, centerY = limitY / 2;
            // var radius = centerX;
            // $(window).mousemove(function(e) {
            //    var diffX = e.pageX - centerX;
            //    var diffY = e.pageY - centerY;
            
            //    // Get the mouse distance from the center
            //    var r = Math.sqrt(diffX * diffX + diffY * diffY);
            
            //    if (r > radius) {
            //      // Scale the distance down to length 1 
            //      diffX /= r;
            //      diffY /= r;
            
            //      // Scale back up to the radius
            //      diffX *= radius;
            //      diffY *= radius;
            //    }
            
            //    mouseX = centerX + diffX;
            //    mouseY = centerY + diffY;
            // });

                this.relX = (mouse.x - midScreenWidth);
                this.relY = (mouse.y - midScreenHeight);
                this.dist = Math.sqrt(Math.pow(this.relX, 2) + Math.pow(this.relY, 2));
                if(this.dist > this.distFromCenter || this.dist < this.distFromCenter){
                    this.relX /= this.dist;
                    this.relY /= this.dist;

                    this.relX *= this.distFromCenter;
                    this.relY *= this.distFromCenter;

                    this.x = midScreenWidth + this.relX + this.xOffset;
                    this.y = midScreenHeight +this.relY + this.yOffset;
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
        shield = new Shield(planet.x + planet.radius + 35, planet.y, 50, 10, 'silver', planet);
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