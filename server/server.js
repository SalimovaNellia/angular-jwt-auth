const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const tokenSecret = 'secret';
const refreshTokenSecret = 'refreshSecret';
const tokenList = {};
const testUser = { email: 'kelvin@gmai.com', name: 'kelvin'};

app.post('/api/authenticate', (req, res) => {
  if (req.body) {
    let postData = req.body;
    let user = {
      "email": postData.email,
      "name": postData.name
    };

    if (testUser.email === user.email && testUser.password === user.password) {
      const token = jwt.sign(user, tokenSecret, {expiresIn: 900});
      const refreshToken = jwt.sign(user, refreshTokenSecret, {expiresIn: 300});
      const response = {
        signed_user: user,
        token: token,
        refreshToken: refreshToken
      };
      tokenList[refreshToken] = response;
      res.status(200).send(response);
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }

});

app.post('/token', (req, res) => {
  let postData = req.body;

  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
    let user = {
      "email": postData.email,
      "name": postData.name
    };

    const token = jwt.sign(user, tokenSecret, {expiresIn: 900});
    const response = {
      "token": token,
    };
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request')
  }
});

app.use(require('./tokenChecker'));

app.get('/secure', (req,res) => {
  res.send('I am secured...')
})

app.use(bodyParser.json());
app.listen(5000, () => console.log('Server started on port 5000'));
