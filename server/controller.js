const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const inUse = await db.user_in_use(username)

        if(+inUse[0].count !== 0){
            return res.status(200).send({message: 'Username already in use'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const createdUser = await db.create_user(username, hash, `https://robohash.org/${username}`)
        req.session.user={id: createdUser[0].id, username}
        res.status(201).send({message: 'Account Created!', userData: req.session.user})
    },
    login : async(req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const inUse = await db.user_in_use(username)
        if(+inUse[0].count === 0) {
            return res.status(401).send({messsage:'Username not found'})
        }
        const user = await db.find_user(username)
        const result = bcrypt.compareSync(password, user[0].hash)
        if(result === true) {
            req.session.user = {id: user[0].id, username}
            return res.status(200).send({message:'Logged in!', userData: req.session.user})
        }
        res.status(401).send({message: 'Password Incorrect'})
    }
}