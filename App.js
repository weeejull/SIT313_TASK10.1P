const express = require('express');
const mailgun = require('mailgun-js');
const bodyParser = require('body-parser');
const registerRouter = require('./Register');

const app = express();
const mg = mailgun({ apiKey: '7b4a869513f38e52e310fa1dbda7d7e4-f0e50a42-6213025c', domain: 'sandbox1019fe9cefea43ac81c9aaf2c7565d31.mailgun.org' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'vijul4860.be22@chitkara.edu.in',
        to: email,
        subject: 'Welcome to DEV@Deakin!',
        text: `Hey there,\n\nHold onto your coding hats, because you've just stepped into the wildest tech party this side of the digital universe! 🎉🎈🥳\n\nAt DEV@Deakin, we are all about coding, creating, and caffeine-fueled brainstorming sessions. Get ready to meet fellow coding comrades, discuss the meaning of life (and semicolons), and marvel at the marvels of technology.\n\nWarning: Your life may now include spontaneous bursts of code excitement and endless debates about tabs versus spaces.\n\nSo buckle up, because the tech extravaganza is just getting started!\n\nHigh-fives and error messages,\nThe Silly Tech Squad 🤖`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('An error occurred while sending the welcome email.');
        } else {
            console.log('Email sent successfully:', body);
            res.send('Welcome email sent successfully.');
        }
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running at port 4000`);
});