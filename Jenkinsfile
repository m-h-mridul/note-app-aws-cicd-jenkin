

pipeline {
    agent any 
    environment {
        // Define environment variables if needed
        IMAGE_NAME = "my-note-app"  // Set your desired image name
        DOCKERFILE_PATH = "./my-react-app/dockerfile"  // Path to your Dockerfile
        url="34.203.218.102"
    }

    stages {
        stage("Clone Code") {
            steps {
                echo "Cloning the code"
                git url: "https://github.com/m-h-mridul/note-app-aws-cicd-jenkin.git", branch: "main"
            }
        }

        stage("Build") {
            steps {
                echo "Building the image"
                sh "ls -l"
                sh "docker build -t my-note-app ./my-react-app/"
                sh "docker build -t my-note-app-backend ./backendserver/"
            }
        }

        stage("Push to Docker Hub") {
            steps {
                echo "Pushing the image to docker hub"
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'DOCKERHUB_PASS', usernameVariable: 'DOCKERHUB_USER')]) {
                    sh "docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS"
                    sh "docker tag my-note-app $DOCKERHUB_USER/my-note-app:latest"
                    sh "docker tag my-note-app-backend $DOCKERHUB_USER/my-note-app-backend:latest"
                    sh "docker push $DOCKERHUB_USER/my-note-app:latest"
                    sh "docker push $DOCKERHUB_USER/my-note-app-backend:latest"
                }
            }
        }
        stage("Run images") {
            steps {
                echo "Run docker images"
                sh "ls -l "
                sh "docker images"
                
                echo "Deploying the container"
                

                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'DOCKERHUB_PASS', usernameVariable: 'DOCKERHUB_USER')]) {
                sh "docker ps"
                sh "ls -l "
                sh "docker-compose down && docker-compose up -d"
                // sh "docker run -d -p 8000:8000 $DOCKERHUB_USER/my-note-app:latest"
                // sh "docker run -d -p 3000:3000 $DOCKERHUB_USER/my-note-app-backend:latest"
                
                }
                
            }
        }
    }

    post {
        success {
            emailext(
                subject: "Build Success: ${currentBuild.fullDisplayName}",
                body: "Build successful. You can access the application at: http://your-server/your-app",
                to: 'mhmahin650@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "Build Failed: ${currentBuild.fullDisplayName}",
                body: "Build failed. Please check the Jenkins build logs for more details.",
                to: 'mhmahin650@gmail.com'
            )
        }
    }
}
