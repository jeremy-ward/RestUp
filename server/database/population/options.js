/* Object containing objects that  add*/ 

//Example only. Remove when adding own
var samplePopObj = {
  /*object with property name equal to the Model names
    that require population from other mongoDB model*/
  Document1 : [  //array of object with options
    {path: 'linkedDoc1'},
    {path : "data.linkedDoc"}
  ],
  Document2 : [
    {path : "anotherDocLink"}
  ]
};

module.exports={

};