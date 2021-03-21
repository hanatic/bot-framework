# Discord Bot Framework

A basic framework for building a DiscordJS bot.

#### What you'll need:
  - A Discord account
  - NodeJS and NPM installed locally

#### How to setup:
  1) Once you've installed NPM and NodeJS, open a command line and navigate to your folder like so:
      `cd path/to/folder`
  2) Then clone this git repo into there:
      `git clone https://github.com/hanatic/bot-framework.git`
  3) Enter the folder that it cloned it into:
      `cd bot-framework`
  4) Install the required packages:
      `npm install`
  5) \[Optional\] Install nodemon for easy code editing:
      `npm install nodemon -g`
  6) Add your bot token to config.json and add your bot to a server. This is a complex step:
      - Go to https://discord.com/developers/applications
      - If prompted, log in to your Discord account
      - Press "New Application"
      - Type a name in the box that pops up
      - \[Optional\] Add an icon in the General Information tab
      - Go to the Bot tab
      - Press "Add Bot", then "Yes, do it!"
      - \[Optional\] Change the name and icon
      - Press the "Copy" button under the Token section
      - Type the following code into a new file in the project folder called `config.json`:
          ```json
          {
            "token": "PASTE YOUR TOKEN IN HERE",
            "prefix": "?"
          }
          ```
      - Then go back to the Discord Developers page and go to the OAuth2 tab
      - Tick the "bot" and "applications.commands" boxes, then copy the URL at the bottom
      - Paste the URL into a new tab
      - Choose a server which you (**IMPORTANT**) **must have the Manage Server permission**. If you created the server, you automatically have this
      - Click "Authorize"
      - Do the Captcha, then the bot will be added to your server
   7) Go back to your command line window and make sure you're in the directory you cloned the repo into
   8) Type `node index.js` (or `nodemon index.js` if you installed nodemon. This means that if you're editing the code it will automatically reload the app when you save it.)

The app will now be running!

**Please note:** Once you close the command line window, the bot will be stopped. If you want it hosted 24/7, consider using a hosting company like Heroku. Google this for more. Alternatively, you can run Discord bots on a Raspberry Pi using an SSH server and the NodeJS environment - you can Google this too.
