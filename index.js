const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(cors());

const uri = 'mongodb+srv://bangabariunion:union@cluster0.nyrjtse.mongodb.net/bangabari-union';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.get('/members', async (req, res) => {
  try {
    const database = client.db('bangabari-union');
    const collection = database.collection('members');
    const members = await collection.find().toArray();
    res.json(members);
  } catch (error) {
    console.error('Error retrieving members:', error);
    res.status(500).json({ error: 'Failed to retrieve members' });
  }
});
app.get('/police', async (req, res) => {
  try {
    const database = client.db('bangabari-union');
    const collection = database.collection('police');
    const members = await collection.find().toArray();
    res.json(members);
  } catch (error) {
    console.error('Error retrieving members:', error);
    res.status(500).json({ error: 'Failed to retrieve members' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
