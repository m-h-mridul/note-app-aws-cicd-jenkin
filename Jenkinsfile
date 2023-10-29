
pipeline {
    agent any 
    
    stages{
        stage("Clone Code"){
            steps {
                echo "Cloning the code"
                git url:"https://github.com/m-h-mridul/note-app-aws-cicd-jenkin", branch: "main"
            }
        }
        stage("Build"){
            steps {
                echo "Building the image"
                sh "docker build -t my-note-app ./my-react-app/"
                sh "docker build -t my-note-app-backend ./backendserver/"
            }
        }
        stage("Push to Docker Hub"){
            steps {
                echo "Pushing the image to docker hub"
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                sh "docker tag my-note-app ${env.dockerHubUser}/my-note-app:latest"
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                sh "docker push ${env.dockerHubUser}/my-note-app:latest"
                }
            }
        }
        stage("Deploy"){
            steps {
                echo "Deploying the container"
                sh "docker-compose down && docker-compose up -d"
                
            }
        }
    }
     post {
        success {
            emailext(
                subject: "Build Success: ${currentBuild.fullDisplayName}",
                body: "Build successful. You can access the application at: http://your-server/your-app",
                to: 'mridul725@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "Build Failed: ${currentBuild.fullDisplayName}",
                body: "Build failed. Please check the Jenkins build logs for more details.",
                to: 'mridul725@gmail.com'
            )
        }
    }
}