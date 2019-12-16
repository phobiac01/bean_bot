const auth = require("./auth.json");
const conf = require("./config.json");
const Discord = require("discord.js");
const random = require("random");
const bot = new Discord.Client();

var token = auth.debugToken;

var usersThatInteracted = ["655240820596932608"];

var lastbeans = 0;
var beansResponses = [
    "I am Beanbot.",
    "I hunger for sacrifice.",
    "A sacrifice of beans...",
    "Beans, beans, the magical fruit",
];




bot.on('message', (message) => {
    if(message.author.id != "655240820596932608") {
        var sender = message.author.id;
        var newUser = true;
        for (var i = 0; i < usersThatInteracted.length; i++) {
            if (sender == usersThatInteracted[i]) {
                console.log(usersThatInteracted[i]);
                newUser = false;
            }
        }
        if (newUser) {
            usersThatInteracted.push(sender);
            console.log("Added new user interaction to list: " + sender);
        }

        switch(message.content.toLowerCase()) {
            case 'help':
                message.channel.send(
                    "Help menu for bean_bot:" + 
                    "\n> help - This is it..." + 
                    "\n> hello / hi / yo / variations - Hello there friend!" + 
                    "\n> uwu pwease mr.obama uwu - commits a sin" + 
                    "\n> debug - Backend debug stuff for bot things" + 
                    "\n> birds - Birds are a concept of the government" + 
                    "\n> beans - Does the beans for you my friend <3" + 
                    "\n> give ferrets - Does just that!"
                );
                break;
                
            case 'hi':
            case 'hello':
            case 'yo':
            case 'heyo':
            case "sup":
                message.channel.send("Hello there " + message.author.username + "!");
                break;

            case 'uwu pwease mr.obama uwu':
                message.channel.send("Then Perish.");
                break;

            case 'debug': 
                message.channel.send("> Did a thing!! <3");
                break;

            case 'birds':
                message.channel.send("Birds aren't real.");
                break;

            case 'beans':
            case 'bean':
                do {
                    var index =  random.int(0, (beansResponses.length - 1));
                    console.log("Generated new: " + index);
                } while (index == lastbeans);
                lastbeans = index;
                message.channel.send(beansResponses[index]);
                break;

            case 'send ferrets':
            case 'give ferrets':
            case 'ferrets': 
            case 'boop':
            case 'excuse me sir':
                message.channel.send("https://ferretsoftiktok.tumblr.com/post/189582543505");
                break;

            case 'shutdown':
                if (sender == conf.owners[0] || sender == conf.owners[1]) {
                    console.error("> Shutting down manually ...");
                    process.exit(0);
                } else 
                    message.channel.send("> :warning: Cant do that, you dont have the right permissions ~");
                

            default:
                console.log("Message recieved, no valid command");
                //message.channel.send("> Not a valid command!");
                break;
        }
    }
});



try {
    bot.login(token);
    console.log('] Bot sucecssfully connected');
} catch(err) {
    console.warn('] Login error >> ' + err);
}

bot.on('ready', (evt) => {
    console.log("] Bot is ready for action!");
});
