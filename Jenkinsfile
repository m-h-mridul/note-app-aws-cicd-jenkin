
pipeline {
    agent any 
    environment {
        // Define environment variables if needed
        IMAGE_NAME = "my-note-app"  // Set your desired image name
        DOCKERFILE_PATH = "./my-react-app/dockerfile"  // Path to your Dockerfile
    }

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
            sh "ls -l"
            sh "cd my-react-app && ls -l"
            sh "docker buildx -t my-note-app ."
            sh "docker buildx -t my-note-app-backend ./backendserver/"         
            }
        }
        // stage('Build Image') {
        //     steps {
        //         script {
        //             // Build the Docker image
        //             docker.build("${IMAGE_NAME}:latest", "-f ${DOCKERFILE_PATH} .")

        //             // Tag the image if needed
        //             // docker.image("${IMAGE_NAME}:latest").tag("${env.BUILD_NUMBER}")
        //             docker.image("${IMAGE_NAME}:latest").tag("3")
        //         }
        //     }
        // }
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