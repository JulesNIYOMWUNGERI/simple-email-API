const { genPassword } = require("../lib/passportUtils");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //hashing password
    const saltHash = genPassword(req.body.password)

    const salt = saltHash.salt
    const hash = saltHash.hash
    
    // Create a user
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash,
        salt
    };
    
    // Save Tutorial in the database
    User.create(newUser)
        .then((user) => {
            console.log('User created:', user.toJSON());
            res.send(user);
        })
        .catch((error) => {
            console.error('Error creating user:', error);
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

//user login 
exports.userLogin = (req,res) => {

        const {email} = req.body;
        console.log(email)
    
        var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
        User.findOne({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
        })



        // const token = jwt.sign({ email:existingUser.rows[0].email,id:existingUser.rows[0].u_id },'mykey');

        // res.status(200).json({ result:existingUser.rows[0], token })
}

// Find a single User with an id
exports.findOne = (req, res) => {
  
};

// Update a user by the id in the request
// exports.update = (req, res) => {
  
// };

// Delete a user with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// Delete all users from the database.
// exports.deleteAll = (req, res) => {
  
// };
