yum install epel-release yum-utils -y
yum install firewalld -y
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --reload
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
yum install nodejs -y
node --version
