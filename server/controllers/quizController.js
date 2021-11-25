const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const Quiz = require('../models/Quiz');


//Create a new Quiz
const createQuiz = asyncHandler(async (req, res) => {

    const {quiz_name, instructions, questions,duration, classId } = req.body;

    //user should be the class teacher
    const foundClass = await Class.findById(classId);

    if(!(String(foundClass.classTeacher) === String(req.user._id))){
        res.status(400);
        throw new Error('You are not the class teacher hence can not create quiz')
    }

    
    const newQuiz = await Quiz.create({
        name: quiz_name,
        instructions,
        questions,
        duration,
        classId 
    })

    if(newQuiz){

        if(!foundClass){
            res.status(400);
            throw new Error('Class does not exist');
        }

        foundClass.quizzes.push(newQuiz._id);
        foundClass.save();

        res.status(201).json({
            newQuiz,
            message:"Quiz Created Successfully"

        })

    }
    else{
        res.status(400);
        throw new Error('Quiz Cannot be created')
    }

  }) 


// GET A QUIZ BY ID
const getQuizById = asyncHandler(async (req, res) => {

    const quiz = await Quiz.findById(req.params.id) ;
    if(quiz){
        res.json(quiz);
    }else{
        res.status(404);
        throw new Error('Quiz not found')
    }

})

//ALLOW USER TO TAKE QUIZ
const allowUserForQuiz = asyncHandler(async(req, res)=>{

    const quiz_id = req.params.id;
    
    const quiz = await Quiz.findById(quiz_id);
    const class_id = quiz.classId;

    if(!quiz){
        res.status(404);
        throw new Error('Quiz Not found');
    }

    //check if user is enrolled in this class or not
    const foundClass = await Class.findById(quiz.classId);
    if(!foundClass){
        res.status(404);
        throw new Error('Class not found')
    }

    if(!(foundClass.enrolledStudents.includes(req.user._id))){
        res.status(400)
        throw new Error('You are not enrolled in this class to take this quiz')
    }


    //check if user already attempted this quiz or not
     const myClass = await User.findOne(

        {"_id":req.user._id},

        { "enrolledClass": { 
            $elemMatch: { 
                "classId" : class_id
             }
        }},
    )
    
    const particularClass = await (myClass.enrolledClass).find(x=> String(x.classId)===String(class_id));

    const attemptedQuizs = particularClass.attemptedQuiz

    const prevQuiz = attemptedQuizs.find(x=> String(x.quiz_id)===String(quiz_id));

    if(prevQuiz){
        res.status(400)
        throw new Error('You have already attempted this Quiz')
    }

    //check if user can take this particular quiz or not
    const allQuizInClass = foundClass.quizzes;
    const curr_quiz_index = allQuizInClass.findIndex((quizId)=> String(quizId)===String(quiz_id))

    const quiz_index_array =[];
    attemptedQuizs.forEach(({quiz_index})=>{

            quiz_index_array.push(quiz_index)

    })

    let len = quiz_index_array.length;
    quiz_index_array.sort();

    let first_smallest_missing_index = len ;
    for(let i=0; i<len; i++){
        if(quiz_index_array[i]!=i){
            first_smallest_missing_index = i;
            break
        }
    }

    console.log(first_smallest_missing_index, curr_quiz_index) //testing

    if(first_smallest_missing_index!=curr_quiz_index)
    {
        res.status(400)
        throw new Error('You cannot take this quiz. Please attempt previous quiz')
    }

    res.status(200).json({
        quiz,
        message:"You can take this quiz"
    });

})



//EVALUATE & SUBMIT QUIZ
const evaluateQuiz = asyncHandler(async(req, res) =>{

    const {attemptedQuestions} = req.body;

    const quiz_id = req.params.id;
 
    const quiz = await Quiz.findById(req.params.id);
    const user = await User.findById(req.user._id);

    const class_id = quiz.classId;

    const foundClass = await Class.findById(class_id);

    const allQuizInClass = foundClass.quizzes;
    
    const quiz_index = allQuizInClass.findIndex((quizId)=> String(quizId)===String(quiz_id))
    console.log(quiz_index) //testing

    const quizQuestions = quiz.questions; //array of object of questions of quiz


    let score = 0
    //check each question's answer
	attemptedQuestions.forEach(({question, selectedOption}) => {

		const realQues = quizQuestions.find((x) => x.question === question)

        if(realQues){

            const correctOption = realQues.answer

            if(correctOption===selectedOption){
                score++;
            }
    
        }	

	})

    //update attempted Quiz list of the user  --->>THIS NEDDS FIXING, 
    const myClass = await User.findOne(

        {"_id":req.user._id},

        { "enrolledClass": { 
            $elemMatch: { 
                "classId" : class_id
             }
        }},
    )

    console.log(myClass) //testing
    const particularClass = await (myClass.enrolledClass).find(x=> String(x.classId)===String(class_id));
    console.log(particularClass) //testing
    particularClass.attemptedQuiz.push({
        quiz_id,
        quiz_score: score,
        quiz_index
    })
    
    //update total Score in a class of a user
    particularClass.totalScore = particularClass.totalScore + score;
    // particularClass.save();
    myClass.save();

    res.status(200).json({score, myClass});


})

module.exports={
    createQuiz,
    getQuizById,
    allowUserForQuiz,
    evaluateQuiz
}