
function loadLoginForm () {
    var loginHtml = `
        <h2 >Login/Register to have your own article</h2>
        <input class="form-control input-lg" type="text" id="username" placeholder="username" />
        <input  type="password" class="form-control input-lg" id="password" placeholder="password" />
        <br/><br/>
        <input  type="submit" class="btn btn-primary btn-lg"  id="login_btn" value="Login" />
        <input type="submit" class="btn btn-primary btn-lg" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;

    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();

        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }
          // Not done yet
        };

        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        submit.value = 'Logging in...';

    };

    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();

        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };

        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        register.value = 'Registering...';

    };
}

function loadLoggedInUser (username) {
  document.getElementById('login_area').innerHTML=` `;
    var logout = document.getElementById('logout');
    logout.innerHTML = `
        <h4 class="text-left" > Hi <i>${username}</i></h4>
        <a href="/logout">Logout</a>
    `;

}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };

    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };

    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
function loadnav(){
  document.getElementById('nav-bar').innerHTML=`
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">Blogging</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="/">Home</a></li>
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="/ui/Introduction">About me <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">profile</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3</a></li>
      </ul>
    </div>
  </nav>
`
return;
}

function loadrules()
{
  document.getElementById('rules').innerHTML=`<ol class="pull-left">
    <li> you have to write an article</li>
      <li> when you type an article you have to set your mood in the mood section</li>
        <li> thats all :)</li>
        </ol>
  `
  return;
}


loadnav();

loadfooter();

loadrules();


loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();



function loadfooter(){
  document.getElementById('foot').innerHTML=`
        <div class="container row-footer ";>
            <div class="row row-footer">
	        <div class="col-xs-5 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                    <h5>Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="/ui/Introduction">About me</li>

                        <li><a href="index.html#">Contact</a></li>
                    </ul>
                </div>
	        <div class="col-xs-6 col-sm-5">
                    <h5>I live in Chennai </h5>
                    <i class="fa fa-phone"></i>: 9840523023<br>
                    <i class="fa fa-envelope"></i>: <a href="githubashutoshsoni@hasura-app.io">m.ashutoshsoni@gmail.com</a>
                    </address>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                    <div class="nav navbar-nav">
                    <a href="https://www.facebook.com/narutosh.uzuoni"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                    <a href="https://twitter.com/ashutoshsoni16"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>               </div>
                    <div class="col-xs-12">
                    <p style="padding:10px;"></p>

                    <p align-items="center">� Copyright 2015 Ristorante Con Fusion</p>
                    </div>
                    </div>
                    </div>`
                    return;
                  }
