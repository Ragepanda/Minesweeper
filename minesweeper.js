$(document).ready(function () {

var height;
var width;
var totalTiles;
var numMines;

function initialize(){
	height = prompt("How many rows do you want?");
	
	
	while(height <8 || height > 30){
		height = prompt("Invalid row count, choose a number between 8-30");
	}
	
	width = prompt("How many columns do you want?");
	
	
	while(width < 8 || width > 40){
		width = prompt("Invalid column count, choose a number between 8-40");
	}	
	
	totalTiles = height*width;
	
	numMines = prompt("How many mines do you want?");
	while(numMines<1||numMines>totalTiles-1){
		numMines = prompt("Invalid mine number, pick between 1-"+totalTiles-1);
	}

	var htmlBody = [];
	
	htmlBody[htmlBody.length]= "<table>"
		for(i=0; i < height; i++){
			htmlBody[htmlBody.length]="<tr>";
			for(j=0; j < width; j++){
				htmlBody[htmlBody.length]="<td id=\""+(i*width+j+1)+"\" class= \"tile\">";
				htmlBody[htmlBody.length]="</td>";
			}
			htmlBody[htmlBody.length]="</tr>";
		}
	htmlBody[htmlBody.length]="</table>";
	$("#minesweeper").append(htmlBody.join(''));

	var tmp = numMines;
	var random;
	
	
	while(tmp>0){
		random = Math.floor(Math.random()*totalTiles)+1;                // Generates a number between 1 and the tile count
		random = random.toString();
		
		if(!$("#"+random).hasClass("bomb")){                           // Randomly inserts "bomb" class identifier into table. 
			$("#"+random).addClass("bomb");
			tmp = tmp-1;
		}
	}
	var blankHolder;
	for(i=1;i<totalTiles+1;i++){
		blankholder = i.toString();
		if(!$("#"+blankholder).hasClass("bomb")){
			$("#"+blankholder).addClass("blank");
		}	
	}
	$("#minesweeper").append("<form><input type=\"button\" id=\"Restart\" value=\"Restart\"></input></form>");
	
}

function bombHandler(index){

	var identifier = index.currentTarget.id;
	if(index.shiftKey&&!$("#"+identifier).hasClass('flag')){
		$("#"+identifier).removeClass('tile');
		$("#"+identifier).addClass('flag');
		return;
	}
	
	if(index.shiftKey&&$("#"+identifier).hasClass('flag')){
		$("#"+identifier).removeClass('flag');
		$("#"+identifier).addClass('tile');
		return;
	}
	
	if($("#"+identifier).hasClass('flag')){
		return;
		}
		
	alert("you lose");
	for(i=1;i<totalTiles+1;i++){
		if($("#"+i.toString()).hasClass('bomb'))
			$("#"+i.toString()).attr('class','loser');
		else	
			$("#"+i.toString()).attr('class','safe');
	}
}

function restart(){
	$("table").remove();
	$("form").remove();
	var restart = initialize();
}

function blankHandler(index){
	var identifier = index.currentTarget.id;
	var idNum = parseInt(identifier);
	
	if(index.shiftKey&&!$("#"+identifier).hasClass('flag')){
		$("#"+identifier).removeClass('tile');
		$("#"+identifier).addClass('flag');
		return;
	}
	
	if(index.shiftKey&&$("#"+identifier).hasClass('flag')){
		$("#"+identifier).removeClass('flag');
		$("#"+identifier).addClass('tile');
		return;
	}
	
	if($("#"+identifier).hasClass('flag')){
		return;
		}
		
	var result = numInsert(idNum);

		$("#"+identifier).attr('class', 'safe');
		
	
	if(result==9){
		blankExpose(idNum);
		result = ' ';
	}
	$("#"+identifier).append(result);
	isOver();
}

function select(idNum){
	var identifier = idNum.toString();
	
	if($("#"+identifier).hasClass('flag'))
		return;
	
	if($("#"+identifier).hasClass('bomb')){
		bombSelect(idNum);
		return;
		}
	var result =  numInsert(idNum);
	
	$("#"+identifier).attr('class', 'safe');
	
	if(result==9){
		result = ' ';
	}
	$("#"+identifier).empty();
	$("#"+identifier).append(result);
	isOver();
}

function blankExpose(idNum){
	var idString = idNum.toString();

	
	var row = parseInt(width);
	var column= parseInt(height);
	var total = parseInt(totalTiles);

	if(idNum==1){
		select(2);
		select(1+row);		
		select(2+row);
		return;
	}
	
	if(idNum==row){	
		select(row-1);	
		select(row*2);
		select(row*2-1);
		return;
	}
	
	if(idNum==total){		
		select(total-1);			
		select(total-row);			
		select(total-row-1);
		return;
	}
	
	if(idNum==total-row+1){
		select(idNum+1);
		select(idNum-row);
		select(idNum-row+1);			
		return;
	}
	
	if(idNum%row==1){
		select(idNum-row);			
		select(idNum+row);			
		select(idNum+1);			
		select(idNum+row+1);			
		select(idNum-row+1);
		return;
	}
	
	if(idNum%row==0){
		select(idNum-row);			
		select(idNum+row);			
		select(idNum-1);			
		select(idNum+row-1);			
		select(idNum-row-1);			
		return bombNum;
	}
	
	if(idNum/row<1){	
		select(idNum+1);			
		select(idNum-1);			
		select(idNum+8);			
		select(idNum+8-1);			
		select(idNum+8+1);			
		return;
	}
	
	if(idNum/row>column-1){
		select(idNum+1);			
		select(idNum-1);			
		select(idNum-row);			
		select(idNum-row-1);			
		select(idNum-row+1);			
		return;
	}
		
		select(idNum+1);			
		select(idNum-1);			
		select(idNum-row);			
		select(idNum-row-1);			
		select(idNum-row+1);			
		select(idNum+row);			
		select(idNum+row-1);			
		select(idNum+row+1);						
		return;
}


function isBomb(idNum){
	var idString = idNum.toString();
	if($("#"+idString).hasClass("bomb")){
		return true;
	}
		return false;
}

function numInsert(idNum){

	var idString = idNum.toString();
	var bombNum=0;
	
	var row = parseInt(width);
	var column= parseInt(height);
	var total = parseInt(totalTiles);
	

	if(idNum==1){
		if(isBomb(2))
			bombNum++;
		if(isBomb(1+row))
			bombNum++;
		if(isBomb(2+row))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum==row){
			
		if(isBomb(row-1))
			bombNum++;
		if(isBomb(row*2))
			bombNum++;
		if(isBomb(row*2-1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum==total){
		
		if(isBomb(total-1))
			bombNum++;
		if(isBomb(total-row))
			bombNum++;
		if(isBomb(total-row-1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		
		return bombNum;
	}
	
	
	if(idNum==total-row+1){
		if(isBomb(idNum+1))
			bombNum++;
		if(isBomb(idNum-row))
			bombNum++;
		if(isBomb(idNum-row+1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum%row==1){
		if(isBomb(idNum-row))
			bombNum++;
		if(isBomb(idNum+row))
			bombNum++;
		if(isBomb(idNum+1))
			bombNum++;
		if(isBomb(idNum+row+1))
			bombNum++;
		if(isBomb(idNum-row+1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum%row==0){
		if(isBomb(idNum-row))
			bombNum++;
		if(isBomb(idNum+row))
			bombNum++;
		if(isBomb(idNum-1))
			bombNum++;
		if(isBomb(idNum+row-1))
			bombNum++;
		if(isBomb(idNum-row-1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum/row<1){
	
		if(isBomb(idNum+1))
			bombNum++;
		if(isBomb(idNum-1))
			bombNum++;
		if(isBomb(idNum+8))
			bombNum++;
		if(isBomb(idNum+8-1))
			bombNum++;
		if(isBomb(idNum+8+1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	if(idNum/row>column-1){
		if(isBomb(idNum+1))
			bombNum++;
		if(isBomb(idNum-1))
			bombNum++;
		if(isBomb(idNum-row))
			bombNum++;
		if(isBomb(idNum-row-1))
			bombNum++;
		if(isBomb(idNum-row+1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	}
	
	
		if(isBomb(idNum+1))
			bombNum++;
		if(isBomb(idNum-1))
			bombNum++;
		if(isBomb(idNum-row))
			bombNum++;
		if(isBomb(idNum-row-1))
			bombNum++;
		if(isBomb(idNum-row+1))
			bombNum++;
		if(isBomb(idNum+row))
			bombNum++;
		if(isBomb(idNum+row-1))
			bombNum++;
		if(isBomb(idNum+row+1))
			bombNum++;
			
		if(bombNum == 0){
			bombNum = 9;
		}
		return bombNum;
	
	}

	
function allSelect(index){
	var identifier = index.currentTarget.id;
	blankExpose(parseInt(identifier));
	return;
}

function bombSelect(idNum){
	var identifier = idNum.toString();
		
	alert("you lose");
	for(i=1;i<totalTiles+1;i++){
		if($("#"+i.toString()).hasClass('bomb'))
			$("#"+i.toString()).attr('class','loser');
		else	
			$("#"+i.toString()).attr('class','safe');
	}
}

function isOver(){
	var safeTiles=0;
	
	for(i=1;i<totalTiles+1;i++){
		if($("#"+i.toString()).hasClass('safe'))
			safeTiles++;
	}
	
	if(safeTiles == totalTiles-numMines){
		alert("You win!");
		
		for(i=1;i<totalTiles+1;i++){
			if($("#"+i.toString()).hasClass('bomb'))
				$("#"+i.toString()).attr('class','loser');
			else	
				$("#"+i.toString()).attr('class','safe');
		}
	}
	else{
		return;
		}
}	

$("#minesweeper").on('click','.safe', allSelect);
$("#minesweeper").on('click','#Restart', restart);
$("#minesweeper").on('click','.bomb', bombHandler);
$("#minesweeper").on('click','.blank', blankHandler);
var init = initialize();

});