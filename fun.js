// const array = [
//     {que:"Q1.The brain of any computer system", A:"ALU", B:"Memory", C:"Control Unit", D:"CPU"}
// ];
// document.getElementsByClassName('que').innerHTML=array[0].que;
// document.getElementsById('a').innerHTML=array[0].A;
// document.getElementById('b').innerHTML=array[0].B;
// document.getElementById('c').innerHTML=array[0].C;
// document.getElementById('d').innerHTML=array[0].D;
$(function(){
    getJSON();
})
        
function getJSON(){
    $.getJSON('question.json',function(json){
        questions = json;
 // console.log(json);
 
     localStorage.setItem('que', JSON.stringify(questions));
     let some =JSON.parse(localStorage.getItem('que'));

    const keys1 = Object.keys(some);
   let q = some[keys1[1]];
    console.log(q["question"]);
    // console.log(q["options"]);
        document.getElementById('showQues').innerHTML = q["question"];
        document.getElementById('a').innerHTML = q["options"]["a"];
        document.getElementById('b').innerHTML = q["options"]["b"];
        document.getElementById('c').innerHTML = q["options"]["c"];
        document.getElementById('d').innerHTML = q["options"]["d"];
   }
 )};
 $(document).ready(function(){
    $(".next").click(function(){
        $(".header").show();
        $(".next-previous").show();
        $(".que").show();
        $(".ans").hide();
    })
    $(".previous").click(function(){
        $(".header").show();
        $(".next-previous").show();
        $(".que").show();
        $(".ans").show();
    })
});