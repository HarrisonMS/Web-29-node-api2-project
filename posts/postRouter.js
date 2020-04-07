const express = require("express");

const router = express.Router();

const Posts = require("./postModel");

router.use(express.json());

//GET post request returns all posts
router.get(`/`, (req, res) => {
  Posts.find(req.query)
  .then(posts => {
      res.status(200).json(posts);
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error retrieveing posts"})
  })
})

router.get(`/:id`, (req, res) => {
  const id = req.params.id
  Posts.findById(id)
  .then(post => {
    {post 
      ? res.status(200).json(post) 
      : res.status(404).json({error: "The posts information could not be retrieved."}) 
    }
  })
})

router.get(`/:id/comments`, (req, res) => {
  const id = req.params.id
  Posts.findById(id)
  .then(post => {
    if(post < 3){
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      Posts.findPostComments(id)
      .then(comments =>{
        if(comments) {
          res.status(200).json(comments)
        }else {
          res.status(404).json({error: "no comments found here"})
        }
      }) 
      .catch((error) => {
        console.log("error retrieveing comments", error);
        res.status(500).json({
            errorMessage: "there wasn an error trying to retrieve that comment info"
        })
      })
    }
  })
})

router.post('/', (req, res) => {
  const posts = req.body;
  if(!posts.title || !posts.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
  } else {
    Posts.insert(posts)
    .then((post) => {
      res.status(201).json(post)
    }).catch((error) => {
      console.log('error saving post');
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
  }
})

module.exports = router;