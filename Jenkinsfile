pipeline {
    agent any
    environment {
        // Set necessary environment variables for the Jenkins user
        HOME = "/var/lib/jenkins"  // Adjust based on your Jenkins user's home directory
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {
                    // Run the commands directly as Jenkins user (no need for sudo)
                    sh '''
                    echo "Starting SSH agent..."
                    eval $(ssh-agent -s)
                    echo "Adding SSH key..."
                    ssh-add ~/.ssh/id_rsa_bitbucket

                    echo "Navigating to the Laravel project directory..."
                    cd /var/www/html/mern-stack



                    echo "Pulling latest code from origin/main..."
                    git pull origin main --no-rebase

                    cd /var/www/html/mern-stack/front-end
                    echo "NPM install start"
                    npm install
                    echo "NPM install end"
                    echo "NPM build start"
                    npm run build
                    echo "NPM build end"
                    pm2 restart all
                    '''
                }
            }
        }
    }
}