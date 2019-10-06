const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const randtoken = require('rand-token');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const tokenSecret = 'secret';
const refreshTokenSecret = 'refreshSecret';
const tokenList = {};
const testUser = { email: 'kelvin@gmail.com', name: 'kelvin'};

app.post('/api/authenticate', (req, res) => {
  if (req.body) {
    let postData = req.body;
    let user = {
      "email": postData.email,
      "name": postData.name
    };

    if (testUser.email === user.email && testUser.password === user.password) {
      const token = jwt.sign(user, tokenSecret, {expiresIn: 300});
      const refreshToken = randtoken.uid(256);
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

app.get('/profile', (req, res) => {
  let request = req.header('auth_token');
  res.status(200).send('Profile information')
})

app.post('/refresh', function (req, res) {
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const user = {
      'username': refreshTokens[refreshToken],
      'role': 'admin'
    }
    const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    res.json({jwt: token})
  }
  else {
    res.sendStatus(401);
  }
});


app.get('/secure', (req,res) => {
  res.send('I am secured...')
})

app.use(bodyParser.json());
app.listen(5000, () => console.log('Server started on port 5000'));
