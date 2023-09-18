const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
  public_users.post("/register", (req,res) => {
  
  
    const { username, password } = req.body;

  // Validate inputs
  

  // Check if username exists
  const existingUser = users.find(user => user.username === username);
  if(existingUser) {
    return res.status(400).send('Username already exists');
  };

  // Create new user object
  const user = {
    username,
    password
  };

  // Add to users array
  users.push(user);

  // Return success response
  res.status(201).send('User registered successfully');
});
  
  // Get book details based on ISBN
  public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    
    
  
    const isbn = req.params.isbn;
    return res.status(200).send(books[isbn])
  
  
   });
  
  // Get book details based on author
  public_users.get('/author/:author',function (req, res) {
    //Write your code here
    
    
    const author = req.params.author;
    let authers = Object.values(books).filter((book)=>{
      return book.author === author 
    });
  
    return res.status(200).send(authers)
  
  });
  
  // Get all books based on title
  public_users.get('/title/:title',function (req, res) {
    //Write your code here
    
  
    const title = req.params.title;
    let titles = Object.values(books).filter((book)=>{
      return book.title === title 
    });
  
    return res.status(200).send(titles)
  
  
  });
  
  //  Get book review
  public_users.get('/review/:isbn',function (req, res) {
    //Write your code here

    const isbn = req.params.isbn;
    const book = books[isbn];
    return res.send(book.reviews)
  
  });

  public_users.get('/',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
      res.send(JSON.stringify({books},null,4));
  });
  // Get the book list available in the shop using promises
  public_users.get('/async',function (req, res) {
      let myPromise = new Promise((resolve,reject) => {
            resolve(res.send(JSON.stringify({books},null,4)));
          });
      myPromise.then((successMessage) => {
          console.log("Promised Resolved")
      })
  });

  public_users.get('/isbn/:isbn/async',function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject) => {
        resolve(res.send(books[isbn]));
    });
    myPromise.then((successMessage) => {
        console.log("Promised Resolved")
    })
 });
 public_users.get('/author/:author/async',function (req, res) {
    const author = req.params.author;
    for (let ibsn in books) {
        if (books[ibsn].author === author) {
            let myPromise = new Promise((resolve,reject) => {
                resolve(res.send(books[ibsn]));
            });
            myPromise.then((successMessage) => {
                console.log("Promised Resolved")
            })
        }
    }
});

public_users.get('/title/:title/async',function (req, res) {
    const title = req.params.title;
    for (let ibsn in books) {
        if (books[ibsn].title === title) {
            let myPromise = new Promise((resolve,reject) => {
                resolve(res.send(books[ibsn]));
            });
            myPromise.then((successMessage) => {
                console.log("Promised Resolved")
            })
        }
    }
});
module.exports.general = public_users;
