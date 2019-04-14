const canvas = document.getElementById("canvas"),   
xImg = document.getElementById("x"),
circleImg = document.getElementById("circle"),
xScoreHtml = document.getElementById("xScore"),
circleScoreHtml = document.getElementById("circleScore"),
ctx = canvas.getContext("2d"),
scoreImagesSide = 70;

canvas.width = window.innerHeight - 5;
canvas.height = window.innerHeight - 5;
canvas.style.position = "relative";
canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";

xImg.style.position = "relative";
xImg.style.width = scoreImagesSide + "px";
xImg.style.height = scoreImagesSide + "px";
xImg.style.right = window.innerWidth - canvas.width + 15 + "px";
xImg.style.bottom = window.innerHeight - scoreImagesSide - 15 + "px";

circleImg.style.position = "relative";
circleImg.style.width = scoreImagesSide + "px";
circleImg.style.height = scoreImagesSide + "px";
circleImg.style.left = window.innerWidth - scoreImagesSide * 2 + "px";
circleImg.style.bottom = window.innerHeight + 100 + "px";

xScoreHtml.style.position = "relative";
xScoreHtml.style.width = scoreImagesSide + "px";
xScoreHtml.style.height = scoreImagesSide + "px";
xScoreHtml.style.left = scoreImagesSide + "px";
xScoreHtml.style.bottom = window.innerHeight - 5 + "px";

circleScoreHtml.style.position = "relative";
circleScoreHtml.style.width = scoreImagesSide + "px";
circleScoreHtml.style.height = scoreImagesSide + "px";
circleScoreHtml.style.left = window.innerWidth - scoreImagesSide + 5 + "px";
circleScoreHtml.style.bottom = window.innerHeight + scoreImagesSide * 2.5 + 5 + "px";

document.body.style.margin = 0;
document.body.style.overflow = "hidden";
document.body.style.background = "papayawhip";

ctx.lineWidth = 5;
ctx.strokeStyle = "gray";

 const dimensions = 3,//(function(){
//         let d = +prompt("How many dimensions do you want to play? Minimum is 3 maximum is 10!");

//         while(d < 3 || !d || d > 10){
//             d = +prompt("You entered invalid input. Enter again")
//         }

//         return d;
//     })(),
    squaresSide = canvas.width / dimensions,
    whoStarts = "x";
    
let isXturn = whoStarts === "x" ? true : false,
    grid = [];

const createGrid = () => {
        for (let row = 0; row < dimensions; row++) {
            grid[row] = [];
            
            for (let col = 0; col < dimensions; col++) {
                grid[row].push(new function(x, y){
                    this.x = x;
                    this.y = y;
                    this.img = null;

                    this.drawImg = () => {
                        if(this.img)
                        {
                            ctx.drawImage(this.img, this.x + 5, this.y + 5, squaresSide - 10, squaresSide - 10)
                        }
                    }
                }(col * squaresSide, row * squaresSide));
            }                
        }   
    },
    drawGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let index = 1; index < dimensions; index++) {                       
            ctx.moveTo(0, index * squaresSide);
            ctx.lineTo(canvas.width, index * squaresSide);
                    
            ctx.moveTo(index * squaresSide, 0);
            ctx.lineTo(index * squaresSide, canvas.height);

            ctx.stroke();
        }      
    
        grid.forEach(row => row.forEach(square => square.drawImg()));
    },
    findClickedSquare = (xToCheck, yToCheck) => {
        for (const row in grid) {
            let square = grid[row].find(square => square.x <= xToCheck && 
                square.x + squaresSide >= xToCheck && 
                square.y <= yToCheck &&
                square.y + squaresSide >= yToCheck
                && !square.img);

            if(square)
            {
                return square;
            }
        }
    },
    checkWin = () => {
        
    },
    checkTie = () => {
        if(!grid.find(row => row.find(square => !square.img))){
            alert("TIE");

            grid = [];
            createGrid();
            drawGrid();
        }
    }
    
window.addEventListener("click", (event) => {
    clickedSquare = findClickedSquare(event.clientX - (window.innerWidth / 2 - canvas.width / 2),                                            event.clientY);

    if(clickedSquare){
        if(isXturn){
            clickedSquare.img = xImg;
        }
        else {
            clickedSquare.img = circleImg;
        }

        isXturn = !isXturn;
    }

    drawGrid();
    checkTie();
});

createGrid();
drawGrid();