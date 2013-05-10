$(document).ready(function(){
  $("#email").blur(function(){
    var email = $("#email").val();
    var emailReg = /\w+@\w+.\w+/;
    $.post("#",{"url": email},function(data){
      alert(date);
    });
    if((!email.match(emailReg))&&(email.length != 0)){
      $("#email-error").html("邮箱地址不合法");
      $("#email-error").css("display","inline");
    }else if(email.length === 0){
      $("#email-error").html("请输入邮箱地址");
      $("#email-error").css("display","inline");
    }else
      $("#email-error").css("display","none");
  });
  $("#username").blur(function(){
    var username = $("#username").val();
    if((username.length < 6)&&(username.length != 0)){
      $("#username-error").html("用户名长度至少为6");
      $("#username-error").css("display","inline");
    }
      else if(username.length === 0){
        $("#username-error").html("请输入用户名");
        $("#username-error").css("display","inline");
      }
    else{
      $("#username-error").css("display","none");
    }
  });
  $("#password").blur(function(){
    var password = $("#password").val();
    if((password.length < 6)&&(password.length != 0)){
      $("#password-error").html("密码长度至少为6");
      $("#password-error").css("display","inline");
    }else if(password.length === 0){
      $("#password-error").html("请输入密码");
      $("#password-error").css("display","inline");
    }
    else
      $("#password-error").css("display","none");
  });
  $("#password_confirmation").blur(function(){
    var password_confirmation = $("#password_confirmation").val();
    var password = $("#password").val();
    if(password != password_confirmation){
      $("#password_confirmation-error").html("两次输入密码不同");
      $("#password_confirmation-error").css("display","inline");
    }
    else
      $("#password_confirmation-error").css("display","none");
  });
  $("#project_name").blur(function(){
    var project_name = $("#project_name").val();
    if(project_name.length == 0){
      $("#project_name_error").css("display","inline");
    }
    else
    {
      $("#project_name_error").css("display","none");
    }
  });
  $("#project_preview").blur(function(){
    var project_preview = $("#project_preview").val();
    if(project_preview.length === 0){
      $("#project_preview_error").css("display","inline");
    }
    else
    {
      $("#project_preview_error").css("display","none");
    }
  });
});
