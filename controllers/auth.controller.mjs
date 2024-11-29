import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import db from '../models/index.mjs';

config();

const User = db.user;
const Role = db.role;

const controller = {
  signup: (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
      if (err) {
        return res.render('register', { message: 'Error during registration. Please try again.' });
      }

      if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
          if (err) {
            return res.render('register', { message: 'Error assigning roles.' });
          }

          user.roles = roles.map(role => role._id);
          user.save((err) => {
            if (err) {
              return res.render('register', { message: 'Error saving user roles.' });
            }
            res.render('signup-success', { message: 'User was registered successfully! Please log in.' });
          });
        });
      } else {
        Role.findOne({ name: 'user' }, (err, role) => {
          if (err) {
            return res.render('register', { message: 'Error assigning default user role.' });
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              return res.render('register', { message: 'Error saving user.' });
            }
            res.render('signup-success', { message: 'User was registered successfully! Please log in.' });
          });
        });
      }
    });
  },

  signin: (req, res) => {
    User.findOne({ username: req.body.username })
      .populate('roles', '-__v')
      .exec((err, user) => {
        if (err) {
          return res.render('login', { message: 'Error during login. Please try again.' });
        }

        if (!user) {
          return res.render('login', { message: 'User Not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.render('login', { message: 'Invalid Password!' });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: 86400, // 24 hours
        });

        const authorities = user.roles.map(role => 'ROLE_' + role.name.toUpperCase());

        res.cookie('accessToken', token, { httpOnly: true, maxAge: 86400000 });  // Store token in cookie

        res.redirect('/profile');  // Redirect to profile or dashboard after successful login
      });
  },
};

export default controller;
