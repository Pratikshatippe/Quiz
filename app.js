let page = 0;
	let randSortArr = new Array();
	// let questionsAndAnswers = new Array();
	let randomVal;
	let selectedAnswers = new Array();
	let correctAnswers = {0:0, 1:1, 2:2, 3:3, 4:1, 5:2, 6:0, 7:3, 8:0, 9:2, 10:1, 11:2, 12:2, 13:1, 14:1, 15:3, 16:3, 17:1, 18:0, 19:1, 20:2};
	/*
	** Question and Answer default
	*/
	



// 	$(function(){

//     getJSON()

// 	})
	
// let questionsAnswers;

//     $.getJSON('questions.json',function(json){

//     set=json;	

//     localStorage.setItem("Quiz",JSON.stringify(set));

//     questionsAndAnswers = JSON.parse(localStorage.getItem("Quiz"));

// // console.log(questionsAndAnswers)


// })

fetch("questions.json")
	.then(function(resp){
		return resp.json();
	})
	.then(function(data){
		let questionsAndAnswers = data;
	
	// console.log(questionsAndAnswers);

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = public function() {
//   if (this.readyState == 4 && this.status == 200) {
	  
//     let questionsAndAnswers = JSON.parse(this.responseText);
//     // document.getElementById("demo").innerHTML = myArr[0];
// 	console.log(questionsAndAnswers);
// //   }
// // };
// }
// };
// xmlhttp.open("GET", "questions.json", true);
// xmlhttp.send();
// xmlhttp.open("GET", "questions.json", true);
// xmlhttp.send();
// console.log(ne



// let questionsAndAnswers1 = JSON.parse(localStorage.getItem("Quiz"));

// console.log(questionsAndAnswers);

// document.getElementById("showQues").innerHTML = myObj;
// document.getElementById("showQues").innerHTML = questionsAndAnswers;

   

// console.log("here");	
	// questionsAndAnswers = [{
	// 			0: [{
	// 				0: "Question 1",
	// 				5: [{
	// 					0: "Q1 Answer 1",
	// 					1: "Q1 Answer 2",
	// 					2: "Q1 Answer 3",
	// 					3: "Q1 Answer 4"
	// 				}]
	// 			}],
	// 			1: [{
	// 				1: "Question 2",
	// 				6: [{
	// 					0: "Q2 Answer 1",
	// 					1: "Q2 Answer 2",
	// 					2: "Q2 Answer 3",
	// 					3: "Q2 Answer 4"
	// 				}]
	// 			}],
	// 			2: [{
	// 				2: "Question 3",
	// 				7: [{
	// 					0: "Q3 Answer 1",
	// 					1: "Q3 Answer 2",
	// 					2: "Q3 Answer 3",
	// 					3: "Q3 Answer 4"
	// 				}]
	// 			}],
	// 			3: [{
	// 				3: "Question 4",
	// 				8: [{
	// 					0: "Q4 Answer 1",
	// 					1: "Q4 Answer 2",
	// 					2: "Q4 Answer 3",
	// 					3: "Q4 Answer 4"
	// 				}]
	// 			}],
	// 			4: [{
	// 				4: "Question 5",
	// 				9: [{
	// 					0: "Q5 Answer 1",
	// 					1: "Q5 Answer 2",
	// 					2: "Q5 Answer 3",
	// 					3: "Q5 Answer 4"
	// 				}]
	// 			}]
	// 		}];

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

	/*
	** Function onclick previous selection
	*/
	function prev() {
		$('#sub').hide();
		$('#next').show();
		if(page === 0) {
			// alert("This is the first page!!");
			return
		}
		for(let i=0; i<4; i++) {
			$('#radio_'+page).remove();
		}
		page--;
		// returns value in array -- position 1
		let arr1 = selQues(randSortArr[page]);
		// Select questions
		quesDisp(arr1, page, "prev");
	}

	/*
	** Function onclick next selection
	*/
	function next() {
		if(page === 4) {
			$('#next').hide();
			$('#sub').show();
			return 
		}
		$('#prev').show();
		for(let i=0; i<4; i++) {
			$('#radio_'+page).remove();
		}
		page++;
		// returns value in array -- position 1
		let arr1 = selQues(randSortArr[page]);
		// Select questions
		quesDisp(arr1, page, "next");
	}

	/*
	** Function random
	*/
	function random() {
		randomVal = [0, 1, 2, 3, 4];
		randomVal.sort(function(a, b){return 0.5 - Math.random()});
		return randomVal;
	}

	/*
	** Function Sel Ques
	*/
	function selQues(pos) {
		let arrNum = randomVal[pos];
		// let arrNum = 2;
		//get the question
		let quesNum = arrNum === 0? 0: arrNum === 1? 1: arrNum === 2? 2: arrNum === 3?
					3: arrNum === 4? 4: 0;
		//get the answer
		let ansNum = arrNum === 0? 5: arrNum === 1? 6: arrNum === 2? 7: arrNum === 3?
					8: arrNum === 4? 9: 5;
		return [arrNum, quesNum, ansNum];
	}

	/*
	** Function Ques Disp
	*/
	function quesDisp(arr, page, action) {
		let checked;
		let rowSel;
		if(typeof selectedAnswers != 'undefined' && selectedAnswers.length !== 0) {
			selectedAnswers.forEach(function(e) {
				if(arr[0] === e[0] && arr[2] === e[1]) {
					// alert('match'+arr[0]+'-'+arr[2]);
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

	function radioClick(ques, ans, id) {
		// let res = passVal.split("-");
		let tempArray = [ques, ans, id];
		selectedAnswers.push(tempArray);
		// console.log(selectedAnswers);
	}

	function submit() {
		$('#prev').hide();
		$('#next').hide();
		$('#sub').hide();

		// show answers
		let e = $('<div class="row"><h1>Results</h1></div>');
		e.attr('id', 'radio_'+page+'');
		$('#showAnswers').append(e);

		let cnt = 1;
		selectedAnswers.forEach(function(m){
			let d = $('<div class="cl-lg-12"><h2 id="showQues"><span><font style="color: #1f8c76;">'+cnt+'. '+questionsAndAnswers[0][m[0]][0][m[0]]+'</font></span></h2></div><div class="row"><h4>'+questionsAndAnswers[0][m[0]][0][m[1]][0][correctAnswers[m[0]]]+'</h4></div>');
			d.attr('id', 'ques_'+m+'');
			$('#showAnswers').append(d);
			cnt++;
		});
	}
});