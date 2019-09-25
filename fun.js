// Intitialization
let page = 0;
let randSortArr = new Array();
let questionsAndAnswers = new Array();
let randomVal;
let selectedAnswers = new Array();
let correctAnswers = {0:0, 1:1, 2:2, 3:3, 4:1, 5:2, 6:0, 7:3, 8:0, 9:2, 10:1, 11:2, 12:2, 13:1, 14:1, 15:3, 16:3, 17:1, 18:0, 19:1, 20:2};

// fetch JSON file data
		
fetch('./question.json', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    // console.log(data);
    localStorage.setItem("Quiz",data);
  })
  .catch(function(error) {
    console.log('JSON Request failed', error)
  });

//  Fetch local storage data

var x = localStorage.getItem("Quiz");
questionsAndAnswers = JSON.parse(x);


//  At the time of window load

$(document).ready(function() {
	$('#prev').hide();
	$('#sub').hide();
	// return random value
	let randVal = random();
	// Use this array after initial random sort
	randVal.forEach(function(e){
		randSortArr.push(e);
	});
	// returns value in array -- position 1
	let arr1 = selQues(randSortArr[0]);
	// Select questions
	quesDisp(arr1, page);
});


//  Function onclick previous selection

function prev() {
	$('#sub').hide();
	$('#next').show();
	if(page === 0) {
		// alert("This is the first page!!");
		return
	}
	for(let i=0; i<20; i++) {
		$('#radio_'+page).remove();
	}
	page--;
	// returns value in array -- position 1
	let arr1 = selQues(randSortArr[page]);
	// Select questions
	quesDisp(arr1, page, "prev");
}


//  Function onclick next selection

function next() {
	if(page === 19) {
		$('#next').hide();
		$('#sub').show();
		return 
    }
	$('#prev').show();
	for(let i=0; i<20; i++) {
		$('#radio_'+page).remove();
	}
	page++;
	// returns value in array -- position 1
	let arr1 = selQues(randSortArr[page]);
	// Select questions
	quesDisp(arr1, page, "next");
}


//  Function random

function random() {
	randomVal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	randomVal.sort(function(a, b){return 0.5 - Math.random()});
	return randomVal;
}


//  Function Sel Ques

function selQues(pos) {
  let j=5;
  let quesNum;
  let ansNum;
	let arrNum = pos;
  for(let i=0; i<20; i++) {
    if(arrNum === i) {
      quesNum = i;
      ansNum = j;
    }
    j++;
  }
	return [arrNum, quesNum, ansNum];
}


// Function Ques Disp

function quesDisp(arr, page, action) {
	let checked;
	let rowSel;
	if(typeof selectedAnswers != 'undefined' && selectedAnswers.length !== 0) {
		selectedAnswers.forEach(function(e) {
			if(arr[0] === e[0] && arr[2] === e[1]) {
				rowSel = e[2];
			}
		});
	}
	document.getElementById("showQues").innerHTML = (page+1)+'. '+questionsAndAnswers[0][arr[0]][0][arr[1]];
	for(let i=0; i<4; i++) {
		if(rowSel === i) {
			checked = "checked";
		} else {
			checked = "";
		}
		// passing Question id, answer id, and radio box id
        let e = $('<div class="radio"><label><input onclick="radioClick('+arr[0]+','+arr[2]+','+i+')" type="radio" '+checked+' name="optradio">'+questionsAndAnswers[0][arr[0]][0][arr[2]][0][i]+'</label></div>');
		e.attr('id', 'radio_'+page+'');
		$('#appendInfo').append(e);
	}
}


//  Onclick radio box

function radioClick(ques, ans, id) {
	let tempArray = [ques, ans, id];
  // check whether the value already been inserted or not
  for(let i=0; i<selectedAnswers.length; i++) {
    if(selectedAnswers[i][0] === ques) {
      // alert("here");
      selectedAnswers[i] = tempArray;
      return
    }
  }
	selectedAnswers.push(tempArray);
}


//  Removing existing array

function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
}

// removed dead  On submit full quiz

function submit() {
    $('.que').hide();
    $('.ans').hide();
    $('.next-previous').hide();
    $('.submit').hide();
  
	// show answers
    let e = $('<div class="row"><h1>Results</h1></div>');
    // console.log(e);
	e.attr('id', 'radio_'+page+'');
	$('#showAnswers').append(e);

	let cnt = 1;
	selectedAnswers.forEach(function(m){

    let d;
    if(m[2] === correctAnswers[m[0]]) {
      // if selected answer is right -- show in green!!
      d = $('<div class="cl-lg-12 output"><h3 id="showQues"><span>'+cnt+'. '+questionsAndAnswers[0][m[0]][0][m[0]]+'</font></span></h3></div><div class="row"><h4> Selected Ans: <font color="blue;">'+questionsAndAnswers[0][m[0]][0][m[1]][0][m[2]]+'</font></h4></div>');
      d.attr('id', 'ques_'+m+'');
      $('#showAnswers').append(d);
    } else {
      // if selected answer is right -- show in red!!
      d = $('<div class="cl-lg-12 output"><h3 id="showQues"><span>'+cnt+'. '+questionsAndAnswers[0][m[0]][0][m[0]]+'</font></span></h3></div><div class="row"><h4> Selected Ans: <font color="blue;">'+questionsAndAnswers[0][m[0]][0][m[1]][0][m[2]]+'</font></h4><h4><font color="blue"> Right Ans:'+questionsAndAnswers[0][m[0]][0][m[1]][0][correctAnswers[m[0]]]+'</font></h4></div>');
      d.attr('id', 'ques_'+m+'');
      $('#showAnswers').append(d);
    }
		cnt++;
	});
}
