#!/bin/bash

sudo apt update

sleep 10s

echo "update all ubuntu packages "

# git clone https://github.com/m-h-mridul/note-app-aws-cicd-jenkin

sudo ls

sleep 15s

echo "docker install ----"

sudo apt-get install docker.io -y && sudo apt install docker-compose -y

sudo systemctl start docker

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

echo "Ec2 port show ----"

netstat -tuln && ss -tuln

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

sudo usermod -aG docker ubuntu jenkins

sudo reboot
