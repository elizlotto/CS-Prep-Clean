/////////////////////////
// THE ISSUES:        //
// ////////////////////

//we wanted to make this game multi-player but found this to be problematic for a few reasons: physically this would be strange. Does the other player turn away when player 1 is answering questions? How do we make a game played on the same screen be cheat proof?
//What kind of code would we implement to switch between players after each turn? Is two days with limited availability enough to brain storm and debug that kind of code?
//Wanted to display a scoreboard at the end of each playthrough 
//We tried randomizing the questions and had success in a separate file but couldn't get the code to run in our project file.
//fun fact: Frank wrote the function that would accept an object as an argument. We couldn't sync up our times to code together, but we noticed how the code was written and added a prompt asking the user what types of questions they'd like to answer, with their answer determining the object passed into the function. It turns out, this was Frank's intention and we figured that out by reading his code. 

//TOOLS USED
// - Callbacks - the functions that run through the questions are pulled through as callbacks within the code that runs the game itself. The randomAnswerOrder function is also called back in the questionsMulti function
// - Loops used
//      for/in
//      while
// - Methods used:
//      Array.forEach
//      Array.includes
//      Array.length
//      String.toLowerCase
//      Math.floor
//      Math.random
//      Object.push
//      Object.keys
// - Other tools used:
//      Prompt
//      Alert
//      Array within an array within an object
//            

//STRETCH POSSIBILITIES
// - add functionality for multiple players, with a scoreboard
// - combine functionality for true/false and multiple choice questions so that the question set could be mixed and matched.
// - add more question sets

/////////////////////////
// THE CODE:        //
// ////////////////////


//////////// QUESTION SETS ////////////

const questionMulti = {
  'What is JS?' : [
     ['Javascript', true],
     ['Jolly Succulents', false], 
     ['Juvenile Singers', false],
    ],
  
  'Who invented the Playstation?' : [
     ['Ken Kutagari', true],
     ['Sony', false], 
     ['Bill Jobs', false]
    ],
  'What is E3?' : [
     ['Tech expo', true], 
     ['Gaming Convention', false], 
     ['Gaming Awards', false]
    ],
  'Which is the name of the latest version of Xbox?' : [
     ['Xbox One X', true], 
     ['Xbox One S', false], 
     ['Xbox Scorpio', false]
    ],
  'Which car drives itself?' : [
     ['Tesla', true], 
     ['BMW', false], 
     ['Maybach', false]
    ],
  'What is a flat, round, portable storage device for computer data?' : [
     ['compact disk', true], 
     ['floppy disk', false], 
     ['USB', false]
    ],
  'Who is credited with patenting the first practical telephone?' : [
     ['Alexander Graham Bell', true], 
     ['Samuel Morse', false], 
     ['Steve Jobs', false]
    ],
  'Nano, Shuffle, Classic and Touch are variations of what?' : [
     ['IPod', true], 
     ['IPad', false], 
     ['IPhone', false]
    ],
  'What is the best selling gaming console to date?' : [
     ['PlayStation 2', true], 
     ['Sega Genesis', false], 
     ['Nintendo Wii', false]
    ],
  'What does GPS stand for?' : [
     ['Global Positioning System', true], 
     ['Global Protection System', false], 
     ['Global Product Strategy', false]
    ],
  'What is an unmanned aerial vehicle?' : [
     ['Drone', true], 
     ['Techbot', false], 
     ['Sky Flyer', false]
    ]
}

const questionsJS = {                                                    
  
  "JavaScript is the grandchild of Java." : 'false',
  
  "JavaScript is not an OOP scripting language." : 'false',

  "JavaScript is not a case-sensitive language?": 'false',

  "String – represents single-character, multi-character, and alphanumeric values.": 'true',

  "Can you assign an anonymous function to a variable and pass it as an argument to another function?": 'true',

  "Closure is a locally declared variable that is related to a function and stays in the memory when the related function has returned.": 'true',

  "There are three different ways of creating an array in JavaScript.": 'true',

  "null == number.": 'false',

  "The value of Math.max([2,3,4,5]) is NaN.": 'true',

  "There are three types of functions JS support.": 'false',

  "0.1 + 0.2 = 0.3.": 'false',

  "[10, 5, 1].sort() is [1, 10, 5].": 'true'
}

const questionsST = {
 // "Spock encounters the captain of the USS Enterprise-D on Romulus and initially refuses to help him because he does not trust the Federation of Planets to carry out his mission." : 'true',
 "Patrick Stewart been reading Sonnets every day during the COVID-19 shelter-in-place order on his Instagram SIR PAT STEW." : 'true',
  "Data spends a great deal of his time trying be more robotic." : 'false',
  "The Borg is the main enemy in Star Trek: The Original Series." : 'false',
  "Worf moves to Deep Space 9 because of an explosion." : 'true',
  //"The Q are omnipotent beings that can think desires into reality" : 'true',
  "The alcoholic stash stored in 10 Forward was supplied by Captain Picard." : 'true',
 // "For 75 years, Scotty preserves himself in a teleporter after his ship crashes" : 'true',
  "Kahn took over the SS Botany Bay." : 'true',
  "Captain Kathryn Janeway commands the USS Reliant.": 'false',
  "When Leonard Nimoy discovered Nichelle Nicoles was paid less, he demanded pay equity." : 'true',
  "The Jedi are the most powerful enemies in the Star Trek cannon." : 'false',
  "The actress who portrayed Deanna Troi disliked her character's tight, sexualized uniform." : 'true'
};

const questionsTech = {
  "Sony invented the PlayStation" : 'false', 
  "E3 is a gaming convention." : 'true',
  "Xbox One S is the newest version of Xbox One." : 'false',
  "BMW has a car that drives itself" : 'false',
  " A floppy disk is a flat, round, portable storage device for computer data." : 'false', 
  "Alexander Graham Bell is credited with patenting the first practical telephone" : 'true',
  "Nano, Shuffle, Classic and Touch are variations of an IPod" : 'true',
  "GPS stands for Global Protection System": 'false',
  "VR means virtual robots" : 'false',
  "A phablet is a mobile device." :'true',
};

//////////// END OF QUESTION SETS ////////////


//////////// FUNCTION DEFINITIONS ////////////
function askTF (name, questionSet) {
  let strikeCount = 0;
  let pointsEarned = 0;
  for (let key in questionSet) {
    const answer = prompt (`\n${key} True or False?`);
    if (answer.toLowerCase() == questionSet[key]) {
      pointsEarned ++;
      if (pointsEarned >= 8)
        {
          return alert(`Hooray! You are smart and have won the game!`)
         }
        alert(`Great job, ${name}! You now have ${pointsEarned} points!`)
    } else if (strikeCount <= 1) {
      strikeCount ++;
      alert(`Oh no ${name}! Wrong answer. You just earned a strike! You are now on strike ${strikeCount} of 3`)
    } else {
      strikeCount ++;
      return alert ("That's your third stike. Sorry but... YOU'RE OUT!")
    }
  }
  return pointsEarned;
}

function randomAnswerOrder (answerSet) {
  let order = [];
  while (order.length < answerSet.length) {
    let i = Math.floor(Math.random(answerSet.length) * answerSet.length)
    if (!order.includes(i)) {
      order.push(i);
    }
  }
  return order;
}

function askMulti (name, questionSet) {
  let strikeCount = 0;
  let pointsEarned = 0;
  for (let key in questionSet) {
    //create new random order for answer set. is [1,0,2]
    const order = randomAnswerOrder(Object.keys(questionSet[key]))
    //set answers to new order. ie the second answer is now the first.
    const newQSet = {};
    order.forEach((elem, i) => newQSet[i] = questionSet[key][elem])
    //Ask the question with each possible answer listed.
    const answer = prompt (`${key}\n1 - ${newQSet[0][0]}\n2 - ${newQSet[1][0]}\n3 - ${newQSet[2][0]}\n`)
    
    //Use answer value as the key for the question set to see if it === true
    if (['1','2','3'].includes(answer) && newQSet[answer-1][1]) {
        pointsEarned ++;
        if (pointsEarned >= 8)
        {
          return alert(`Hooray! You are smart and have won the game!`)
         }
        alert(`Great job, ${name}! You now have ${pointsEarned} points!`)
    } else if (strikeCount <= 1) {
      strikeCount ++;
      alert(`Oh no ${name}! Wrong answer. You just earned a strike! You are now on strike ${strikeCount} of 3`)
    } else {
      strikeCount ++;
      return alert ("That's your third stike. Sorry but... YOU'RE OUT!")
    }
  }
  return pointsEarned;
}
//////////// END OF FUNCTION DEFINITIONS ////////////


//////////// RUNNING THE GAME ////////////
const quizGame = () => {
  const name = prompt('What is your name?');
  // const intro = prompt(`This is a game about STUFF. To play you will be prompted with questions of varying difficulty. To answer, you will need to type   without the quotations. If you understand this, type "true"`);
  let points;
  let questionType = prompt("Pick your preference: \nEnter 1 for True or False \nEnter 2 for Multiple Choice")
  if (questionType === '1'){
    let newInput = prompt("\nEnter 1 for Star Trek questions.\nEnter 2 for JavaScript Questions\nEnter 3 for Tech questions\nEnter here: ");; 
    askTF() ;
    if( newInput == 1){
      points = askTF(name, questionsST);
    } else if (newInput == 2){
      points = askTF(name, questionsJS );
    }else if (newInput == 3) {
      points = askTF (name, questionsTech);
   }
  } else if (questionType === '2'){

      point = askMulti(name, questionMulti);
  }
  if (points === 10) {
      return alert (`Awesome ${name}, you are smart and have 10 points to brag about. You win!`) }
    else if (points > 7) {
      return alert (`Good job ${name}, you earned ${points} points.`)
    }    
    
//     const theActualGameFunc = () => {
//        userObj['name'] = name;
//        userObj['points'] = pointsEarned;

//     }

// return theActualGameFunc;
};

let newGame = quizGame();
// newGame()

//////////// END OF RUNNING THE GAME ////////////










// ///////////
// const questionsTF = {
//   "Spock encounters the captain of the USS Enterprise-D on Romulus and initially refuses to help him because he does not trust the Federation of Planets to carry out his mission." : 'true',
  
//   "Patrick Stewart been reading Sonnets every day during the COVID-19 shelter-in-place order on his Instagram SIR PAT STEW." : 'true',
  
//   "JavaScript is the grandchild of Java." : 'false',
  
//   "JavaScript is not an OOP scripting language. True or false? " : 'false',

//   "JavaScript is not a case-sensitive language? True or false? ": 'false',

//   "String – represents single-character, multi-character, and alphanumeric values. True or false?": 'true',

//   "Can you assign an anonymous function to a variable and pass it as an argument to another function?": 'true',

//   "Closure is a locally declared variable that is related to a function and stays in the memory when the related function has returned. True or false?": 'true',

//   "There are three different ways of creating an array in JavaScript. True or false?": 'true',

//   "null == number. True or false?": 'false',

//   "The value of Math.max([2,3,4,5]) is NaN. True or false?": 'true',

//   "There are three types of functions JS support. True or false?": 'false',

// Liz  "0.1 + 0.2 = 0.3. True or false?": 'false',

//   "[10, 5, 1].sort() is [1, 10, 5]. True or false?": 'true'
  
// }

// function askTF (name, questionSet) {
//   let strikeCount = 0;
//   let pointsEarned = 0;
//   for (let key in questionSet) {
//     if (strikeCount === 3) {return}
//     if (pointsEarned === 10) {
//     return alert (`Awesome, you are smart and have 10 points to brag about. You win!`)
//     }
//     const answer = prompt (`${key} True or False?`); 
//     if (answer.toLowerCase() == questionSet[key]) {
//       pointsEarned ++;
//       alert(`Great job! You now have ${pointsEarned} points!`)
//     } else if (strikeCount <= 1) {
//       strikeCount ++;
//       alert(`Oh no! Wrong answer. You just earned a strike! You are now are stike ${strikeCount} of 3`)
//     } else {
//       strikeCount ++;
//       alert ("That's your third stike. Sorry but... YOU'RE OUT!")
//     }
//   }
// }

// const quizGame = () => {
//   const name = prompt('What is your name?');
//   const intro = prompt(`This is a multiple choice game about STUFF. To play you will be prompted with questions of varying difficulty. To answer, you will need to type  "true" or "false" without the quotations. If you understand this, type "true"`);
    
//     if (intro === 'true'){
//     alert(`Great, ${name}! Let's begin`);
//     } else (console.log(`Try again!`))

//   const userObj = {};
//   let strikeCount = 0; //if count is 3, game over 
//   let pointsEarned = 0 // maybe use this instead of the userObj 
//     const theActualGameFunc = () => {
//        userObj['name'] = name;
//        userObj['points'] = pointsEarned;

//     const result = askTF (name, questionsTF);
//    }

// return theActualGameFunc;
// }

// let newGame = quizGame();
// newGame()
