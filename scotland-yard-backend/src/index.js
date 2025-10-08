const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'keykey';

app.use(cors());
app.use(express.json());

let users = [];

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        if (users.find(user => user.username === username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            id: Date.now().toString(),
            username: username.trim(),
            password: hashedPassword,
        };

        users.push(user);

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users', (req, res) => {
    const usersWithoutPasswords = users.map(user => ({
        id: user.id,
        username: user.username,
    }));
    
    console.log(`${usersWithoutPasswords.length} users`);
    res.json(usersWithoutPasswords);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});