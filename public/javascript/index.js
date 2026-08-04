const form = $(".form1");
const submitButton = $(".submit");
const inputValue = $(".input")
const errorHandler = $(".error_display");

form.on("submit" , (event)=>{
     if(inputValue.val() === ""){
        event.preventDefault();
        errorHandler.text("Please enter a input");
        setTimeout(() => {
          errorHandler.text("")
        }, 2000);
     }else{
       const originaltext = submitButton.text();
     submitButton.text("Loading...");
     setTimeout(() => {
     submitButton.text(originaltext);        
     }, 2000); 
     }
});
