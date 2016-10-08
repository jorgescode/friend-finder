var friendsData = require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app)
{
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
    app.get('/api/friends', function(req, res)
    {
        res.send(friendsData);
    });

    app.post('/api/friends', function(req, res)
    {
        var inputFriend = req.body;
        var inputFriendScores = inputFriend.scores;
        var currentDifference = 0;
        var currentMatch;

        for(let friend of friendsData)
        {
            var totalDifference = 0;
            var friendScores = friend.scores;
            for(let i = 0; i < friend.scores.length; i++)
            {
                totalDifference += Math.abs(inputFriendScores[i]-friendScores[i]);
            }

            if(currentDifference > totalDifference || currentMatch === undefined)
            {
                currentMatch = friend;
                currentDifference = totalDifference;
            }

            console.log(friend.name + ': ' + totalDifference);
        }

        console.log(currentMatch);

        res.send(currentMatch);
    });
};