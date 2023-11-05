#!/bin/bash

sudo apt update

sleep 10s

echo "update all ubuntu packages "

# git clone https://github.com/m-h-mridul/note-app-aws-cicd-jenkin

sudo ls

sleep 15s

echo "docker install ----"

sudo apt update && sudo apt install -y docker-buildx-plugin && sudo apt install docker-compose -y
sudo apt install docker.io -y
sudo systemctl start docker

sudo apt install docker-compose -y

echo "user cheak ----"

whoami

echo "user permission given for docker inside ----"

sudo usermod -aG docker ubuntu

sudo apt update

echo " install jenkins ----"

sudo apt install openjdk-11-jre -y

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list >/dev/null
sudo apt-get update
sudo apt-get install jenkins -y

sudo systemctl start jenkins

sudo systemctl enable jenkins

sudo systemctl restart jenkins

echo "Ec2 port show ----"

netstat -tuln && ss -tuln

echo " the jenkins password for login..."

sudo usermod -a -G docker jenkins && sudo systemctl restart jenkins

sudo cat /var/lib/jenkins/secrets/initialAdminPassword
