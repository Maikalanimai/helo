const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const inUse = await db.user_in_use(username);

    if (+inUse[0].count !== 0) {
      return res.status(200).send({ message: "Username already in use" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const createdUser = await db.create_user(
      username,
      hash,
      `https://robohash.org/${username}`
    );
    req.session.user = {
      id: createdUser[0].id,
      username,
      profilePic: createdUser[0].profile_picture
    };
    res
      .status(201)
      .send({ message: "Account Created!", userData: req.session.user });
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const inUse = await db.user_in_use(username);
    if (+inUse[0].count === 0) {
      return res.status(404).send({ messsage: "Username not found" });
    }
    const user = await db.find_user(username);
    const result = bcrypt.compareSync(password, user[0].hash);
    if (result === true) {
      req.session.user = {
        id: user[0].id,
        username,
        profilePic: user[0].profile_picture
      };
      return res
        .status(200)
        .send({ message: "Logged in!", userData: req.session.user });
    }
    res.status(401).send({ message: "Password Incorrect" });
  },
  checklogin: (req,res)=> {
    req.session.user ? 
      res.status(200).send({message: "logged in", userData: req.session.user})
      : res.status(401).send({message: 'please log in'})
    
  },
  getAllPosts: (req, res) => {
    const db = req.app.get("db");
    db.get_all_posts().then(result => {
      res.status(200).send(result);
    });
  },
  getFilteredPosts: (req,res) => {
    const db = req.app.get('db')
    const {search} = req.query
    db.get_search_posts(`%${search}`, `${search}%`).then(result => {
      res.status(200).send(result)
    })
  },
  getPost: (req,res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_post(id).then(result => {
      res.status(200).send(result)
    })
  },
  postPost: (req,res) => {
    const db =req.app.get('db')
    const {user_id, title, content, image_url} = req.body
    db.create_post(user_id, title, content, image_url). then(result => {
      res.status(201).send(result)
    })
  }, 
  deletePost: (req,res) =>  {
    const db = req.app.get('db')
    const {id} = req.params
    db.delete_post(id).then(result=> {
      res.status(200).send(result)
    })
  },
  logout: async (req, res) => {
    req.session.destroy()
    res.status(200). send({message: 'logged out'})
  }
};
