/**
 * Created by willqueen on 11/6/16.
 */
module.exports = function(app) {
    var websites = [
        {_id: 321, name: 'facebook.com', uid: 123},
        {_id: 432, name: 'wikipedia.org', uid: 123},
        {_id: 543, name: 'twitter.com', uid: 234}
    ];

    app.get("/api/user/:uid/website", findWebsiteByUser);
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.send(websites);
    }

    function findWebsiteByUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].uid === uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var id = req._id;
        for (var w in websites) {
            if(websites[w]._id === id) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');

    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params._id;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w] = website;
            }
        }
        res.send(200);


    }

    function deleteWebsite(req, res) {
        var wid = req.params._id;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
            }
        }
        res.send(200);

    }

};