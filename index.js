const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/:owner/:repo/:commitId', async (req, res) => {
  try {
    const {owner,repo,commitId}= req.params;
  
    // Use GitHub API to fetch commit details
    const response = await axios.get(`https://github.com/${owner}/${repo}/${commitId}`);
    const commitDetails = response?.data;
    res.json(commitDetails);
  } catch (error) {
    console.error('Error fetching commit details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


app.get('/api/repository/:owner/:repo/files/:commitId', async (req, res) => {
  try {
    const { owner, repo, commitId } = req.params;
    // Use GitHub API to fetch files changed in the commit
    const response = await axios.get(`https://github.com/${owner}/${repo}/${commitId}`);
    const changedFiles = response.data.map(file => file.filename);
    res.json(changedFiles);
  } catch (error) {
    console.error('Error fetching changed files:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
