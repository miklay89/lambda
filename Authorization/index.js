const keys = require('./keys/keys');
const express = require('express');
const {MongoClient} = require('mongodb');
const client = new MongoClient(keys.MONGO_DB_URI);
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const auth = require('./middleware/auth');

let dbClient;
const PORT = process.env.PORT || 3000;
const app = express();

// connect to DB and runing the server
client.connect((err, client) => {
  if(err) return console.log(err);
  dbClient = client;
  app.locals.authCollection = client.db("auth").collection("users");
  app.locals.sessionsCollection = client.db("auth").collection("sessions");
  app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// registration
app.post('/sign_up', async (req, res) => {

  try {
    if(!req.body.email || !req.body.password) return res.status(400).send("All input is required");
    const email = req.body.email;

    const collection = req.app.locals.authCollection;
    const checkUserExist = await collection.findOne({email: email});
    if(checkUserExist) {
      res.status(400).send("User is exist");
    } else {
      const password = req.body.password;
      const hashPassword = await bcryptjs.hash(password, 10);
      const user = {
        email: email.toLowerCase(),
        password: hashPassword
      };
      
      await collection.insertOne(user, (err, result) => {
        if(err) return console.log(err);
        res.status(201).send("User is registered");
      });
    }
  } catch (e) {
    console.log(e);
  }
});

// login
app.post('/login', async (req, res) => {
  try {
    if (!req.query.email || !req.query.password) {
      return res.status(400).send("All input is required");
    } else {
      const email = req.query.email.toLowerCase();
      const password = req.query.password;
      const authCollection = req.app.locals.authCollection;
      const sessionsCollection = req.app.locals.sessionsCollection;

      const user = await authCollection.findOne({email: email});
      if(!user) {
        res.status(400).send("Invalid User name");
      } else {
        const areSame = await bcryptjs.compare(password, user.password);
      
        if(areSame) {
          const tokens = getTokens(user.user_i, user.email, keys.TOKEN_SECRET);
          // 48h
          const refreshTokenExpTime = Math.floor(Date.now() + 172800000);

          const sesion = {
            userId: user._id,
            refreshToken: tokens.refreshToken,
            expiresIn: refreshTokenExpTime
          };

          await sessionsCollection.insertOne(sesion, (err) => {
            if(err) return console.log(err);
            console.log("Sesion is created");
          });
          res.json(tokens);
        } else {
          res.status(400).send("Invalid password");
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// mock
app.get('/me:id', auth, async (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const result = {
    request_num: id,
    data: {
      username: email
    }
  };

  res.json(result);
});

app.post('/refresh', async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const bearer = bearerHeader.split(' ');
  const refreshToken = bearer[1];
  const collection = req.app.locals.sessionsCollection;
  const session = await collection.findOne({ refreshToken: refreshToken });

  if (session) {
    if (session.expiresIn > Date.now()) {

      const authCollection = req.app.locals.authCollection;
      const user = await authCollection.findOne(session.userId);
      const newTokens = getTokens(user.user_id, user.email, keys.TOKEN_SECRET);
      // 48h
      const newRefreshTokenExpTime = Math.floor(Date.now() + 172800000);
      const newSesion = {
        $set: {
          refreshToken: newTokens.refreshToken,
          expiresIn: newRefreshTokenExpTime
        },
      };

      await collection.updateOne({ refreshToken: refreshToken }, newSesion, (err) => {
        if (err) console.log(err);
        console.log("Sesion was updated");
      });

      res.status(200).json(newTokens);

    } else {
      res.status(401).send("Token is expired, please login");
    }

  } else {
    res.status(401).send("Invalid Token");
  }

});

function getTokens(user_id, email, secret) {
  // from 30 to 60 sec
  const expTokenTime = Math.floor(30 + (Math.random() * 30));
  // 2 days
  const accessToken = jwt.sign({
    user_id: user_id, email: email
  },
    secret,
  {
    expiresIn: expTokenTime
  });
  const refreshToken = uuidv4();
  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return tokens;

}

// ctrl+c end conection with DB
process.on("SIGINT", () => {
  dbClient.close();
});