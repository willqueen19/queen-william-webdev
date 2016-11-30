/**
 * Created by willqueen on 11/6/16.
 */
module.exports = function(app, model) {

    //var pages =
    //    [
    //        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    //    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPageByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function findPageByWebsiteId(req, res) {
        var wid = req.params.websiteId;
        model
            .pageModel
            .findPageByWebsiteId(wid)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pid = req.params._id;
        model
            .pageModel
            .findPageById(pid)
            .then(
                function (page) {
                    res.json(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params._id;
        model
            .pageModel
            .updatePage(pid, page)
            .then(
                function (page) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            )
    }

    function deletePage(req, res) {
        var pid = req.params._id;
        model
            .pageModel
            .deletePage(pid)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove page with ID: " + pid);
                }
            );
    }
}