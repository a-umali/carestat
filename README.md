CareSTAT - Medical Records Management System
Overview
CareSTAT is a web application designed to allow users to securely store, manage, and share their medical records. The application integrates secure authentication using GitHub and custom credentials, ensuring that only authorized users can access sensitive health information. Additionally, users have control over who can access their medical data.

Features
User Authentication: Users can log in via GitHub or custom credentials, powered by NextAuth.js.
Medical Data Management: Store, manage, and share medical records with authorized users.
Tech Stack
Frontend: Next.js, TypeScript
Backend: Node.js
Authentication: NextAuth.js (using GitHubProvider and CredentialsProvider)
Database: MySQL
ORM (optional): Prisma
Getting Started
Prerequisites
Node.js: Version 14 or later
MySQL: A local instance or cloud service
GitHub OAuth App: For GitHub login (create OAuth credentials)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/a-umali/carestat.git
cd carestat
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and populate it with the following:
bash
Copy code
# MySQL Database
DATABASE_URL=mysql://user:password@localhost:3306/db_name

# NextAuth.js secret
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
Database Setup
Create a new MySQL database and run the following SQL scripts to set up the required tables.
sql
Copy code
-- Create the 'carestat' database
CREATE DATABASE IF NOT EXISTS carestat;
USE carestat;

-- Create 'users' table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create 'careteam' table
DROP TABLE IF EXISTS `careteam`;
CREATE TABLE `careteam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `specialty` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create 'cards' table
DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create 'patients' table
DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipCode` varchar(20) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `medicareId` varchar(20) DEFAULT NULL,
  `homePhone` varchar(20) DEFAULT NULL,
  `cellPhone` varchar(20) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `maritalStatus` varchar(50) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `workNumber` varchar(20) DEFAULT NULL,
  `employerAddress` varchar(255) DEFAULT NULL,
  `emergencyContacts` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create 'reminders' table
DROP TABLE IF EXISTS `reminders`;
CREATE TABLE `reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
Running the Application
Start the development server:

bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser to see the application in action.

Learn More
Next.js Documentation - Learn more about Next.js features and API.
Interactive Next.js Tutorial - A step-by-step guide to mastering Next.js.
Deploying Next.js on Vercel - Guide on deploying your app on Vercel.
