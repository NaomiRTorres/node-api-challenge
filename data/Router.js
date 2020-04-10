const express = require('express');
const router = express.Router();

const Projects = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel.js');

//BOTH PROJECT AND ACTION GETS
router.get('/', (req, res) => {
    console.log({...req.query});
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the projects'
        });
    });
});

router.get('/:id', (req, res) => {
    Projects.get()
    .then(p => {
        res.status(200).json(p);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the project'
        });
    });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'Error getting the projects actions'
        });
    });
});


//BOTH PROJECT AND ACTION POSTS
router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the project'
        });
    });
});

router.post('/:id/actions', (req, res) => {
    Actions.insert({...req.body, project_id: req.params.id})
    .then(action => {
        res.status(201).json(action);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the action to project'
        });
    });
});


//BOTH PROJECT AND ACTION PUTS
router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'The user could not be found' });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the project'
        });
    });
});

router.put('/:id/actions/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action=> {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'The action could not be found'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the action'
        });
    });
});


//BOTH PROJECT AND ACTION DELETES
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: 'The project has been successfully nuked'
            });
        } else {
            res.status(404).json({
                message: 'The project could not be found'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error removing the project'
        });
    });
});

router.delete('/:id/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'This projects action has successfully been nuked'
            });
        } else {
            res.status(404).json({
                message: 'The project action could not be found'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error removing the action from this project'
        });
    });
});


module.exports = router;