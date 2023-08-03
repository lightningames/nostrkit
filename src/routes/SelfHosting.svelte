<script>

</script>

<style>

</style>

<div>
    <h1>Guide to Self Hosting</h1>
    <p>In this guide, we will walk you through the process of hosting a SvelteKit project.
        We'll explain step by step, making it easy to follow along no matter your technical abilities.
        The process include cloning the repository, building the project and deploying on a platform of your choice.
    </p>
    <ul>
        <h3><li>Clone the Repository</li></h3>
        <ol>
            <p>1. Go the the GitHub repository containing the NOSTRKIT project</p>
            <p>2. Click on the "Code" button and copy the reository's URL</p>
            <p>3. Access your terminal and navigate tot the directory where you want to store your project</p>
            <p>4. Run the following command to the clone the reository: <strong>git clone `repository-url`</strong></p>
        </ol>
        <h3><li>Build the Project</li></h3>
        <ol>
            <p>1. In the terminal, navigate to the cloned project directory using the <strong>cd</strong> command.</p>
            <p>2. Run the folling command to install the projects dependencies: <strong>npm install</strong></p>
            <p>3. After the installation is complete, build the project using the following command: <strong>npm run build</strong></p>
        </ol>
        <h3><li>Deploy to a Hosting Service</li></h3>
        <ol>
            <h5><li>GitHub Pages</li></h5>
            <ol>
                <p>1. Make sure you have commited all changed tot eh repository using Git</p>
                <p>2. On GitHub, navigate to the "Settings" tab</p>
                <p>3. Scroll down to the "GitHub Pages" section</p>
                <p>4. Selete the "gh-pages" branch as the source for GitHub Pages deployment</p>
                <p>5. Click the "Save" button</p>
                <p>6. After a few moments, your project will be deployed and you can access it using the provided URL</p>
            </ol>
            <h5><li>Vercel</li></h5>
            <ol>
                <p>1. Go to the Vercel website (vercel.com) and log in or create a new account</p>
                <p>2. Click on the "Import Project" button</p>
                <p>3. Choose the repository where you cloned your project</p>
                <p>4. Configure deployment setting as needed</p>
                <p>5. Click on the "Deploy" button</p>
                <p>6. After deployment is complete, your project witll be live on Vercel and you can access it using the URL provided</p>
            </ol>
            <h5><li>Netlify</li></h5>
            <ol>
                <p>1. Go to the Netlify website (netlify.com) and log in or create a new account </p>
                <p>2. Click on the "New Site from Git" button</p>
                <p>3. Choose your Git provider (GitHub) and select the repository</p>
                <p>4. Configure the build setting and set the build command to <strong>`npm run build`</strong>
                and the publish directory to <strong>`build`</strong></p>
                <p>5. Click on the "Deploy" button</p>
                <p>6. Once deployment is done, your project will be hsoted on Netlify and you'll be able to access using the URL provided</p>
            </ol>
            <h5><li>Heroku</li></h5>
            <ol>
                <p>1. Go to the Heroku website (heroku.com) and log in or create a new account</p>
                <p>2. Crea a new app by clicking the "New" button and selecting "Create new app"</p>
                <p>3. Choose a unique app name and select your region</p>
                <p>4. Connect your Heroku app to your GitHub project repository</p>
                <p>5. Enable automatic deploy or manyakky deploy the branch of your choice</p>
                <p>6. Once deployment is complete, your project will be live on Heroku and you will be able to access it using the URL provided</p>
            </ol>
        </ol>
        <h3>Congratualtions</h3>
        <p>
            You have successfully hosted your SvelteKit project! Each platfor offer various advantages
             and features, so choose the one that best fits your projects needs. If you encouter and issues during the process, don't hesitate
             to refer to their documentation or seek help from their respective support communities. Happy deploying!
        </p>
    </ul>
</div>