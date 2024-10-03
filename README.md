# plant-app

## Description

Growing Plants is a two-page web application that allows plant enthusiasts to share their horticultural knowledge. Information on selected plants is populated via API calls to Perenual.

Through this project we gained experience in using the CSS Framework, Bootstrap in addition to making HTTP requests to retrieve API data. Additionally, we extended our understanding of navigating JSON data.

- [User Story](#userstory)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## User Story

AS a user I should be able to view plant cards containing useful information
An API call is triggered, data is retrieved on the selected plant and stored in localStorage. A function retrieves this JSON object from localStorage and populates plant cards.

As a user I should be able to click between the Home page and the Gardening Advice forum.
The header contains links to easily navigate between the two pages.

AS a user I can add plant care tips through the plant cards.
An input element is dynamically loaded on the plant card which takes user input and saves it to localStorage

As a user when I navigate to the Gardening Advice forum I see the tips I have added.
Data from localStorage is retrieved an populated as cards using JavaScript and Bootstrap CSS.

AS a user when I return to the Gardening Advice forum I see tips from previous browser sessions.
Data persists in localStorage

## Working with this repo

### Installation

1. Clone the repository to your local computer

   ```
   git clone <HTTPS URL>
   ```

2. Fetch all remote branches

   ```
   git fetch --all
   ```

3. List all branches (local and remote)

   ```
   git branch -a
   ```

4. If a branch doesn't exist locally but does exist remotely, you can check it out by running:

   ```
   git checkout -b <branch-name> origin/<branch-name>
   ```

   example `git checkout -b mitch-updates origin/mitch-updates`

   WHERE origin/mitch-updates is the remote branch AND mitch-updates is the local branch

### Push Updates

1. Git add

1. Git commit

1. Push changes to the correct remote branch

   ```
   git push origin <branch-name>
   ```

   Example: On my local computer I use
   git push origin mitch-updates
   This will push changes to the remote mitch-updates branch

1. Select the target branch in Github
   ![alt text](image.png)

1. Create the pull request

1. In the dev branch create a pull request with updates from your `name-updates` branch

### Pull Updates

1.

## Credits

This application was created by Gabriel, Robbie & Mitch

## License

This project is licensed under the MIT License
